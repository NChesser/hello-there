import { useState } from "react";

// Store
import {
    useUserProgress,
    useSetUserProgressStore,
    useSetSelectedScreen,
} from "../store/store";

// Components
import ScreenContainer from "../components/ScreenContainer";
import Button from "../components/Button";
import ConfirmDialog from "../components/ConfirmDialog";
import { useConfirmDialog } from "../hooks/useConfirmDialog";
import Card from "../components/Card";


// Icons
import {
    Edit2,
    Trash2,
    Save,
    X,
    Users,
    List,
    LayoutList,
    ChevronRight,
    Search,
    ArrowUpDown,
    Star,
    MessageCircle,
    MapPin,
    Tag,
    Cake,
    Heart,
    Calendar,
    Sparkles,
    Handshake,
    Plus,
} from "lucide-react";

// Types
import type { PersonMet } from "../types/types";
import { RELATIONSHIP_TAGS, THINGS_THEY_LIKE_OPTIONS } from "../types/types";

// Screen Component
const PeopleScreen = () => {
    const userProgress = useUserProgress();
    const setUserProgress = useSetUserProgressStore();
    const { dialogProps, confirm } = useConfirmDialog();
    const setSelectedScreen = useSetSelectedScreen();

    const people: PersonMet[] = userProgress.peopleMet || [];

    const [name, setName] = useState("");
    const [somethingInteresting, setSomethingInteresting] = useState("");
    const [whereMet, setWhereMet] = useState("");
    const [selectedLikes, setSelectedLikes] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [birthday, setBirthday] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editInteresting, setEditInteresting] = useState("");
    const [isCompact, setIsCompact] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<
        "newest" | "oldest" | "name" | "interactions"
    >("newest");

    const toggleFavorite = (id: string) => {
        setUserProgress({
            peopleMet: people.map((person) =>
                person.id === id
                    ? { ...person, isFavorite: !person.isFavorite }
                    : person,
            ),
        });
    };

    const filteredPeople = people.filter((person) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
            person.name.toLowerCase().includes(q) ||
            person.personalNotes?.some((n) =>
                n.text.toLowerCase().includes(q),
            ) ||
            person.somethingInteresting?.toLowerCase().includes(q) ||
            person.whereMet?.toLowerCase().includes(q) ||
            person.tags?.some((t) => t.toLowerCase().includes(q)) ||
            person.interactions?.some((i) => i.text.toLowerCase().includes(q))
        );
    });

    const sortedPeople = [...filteredPeople].sort((a, b) => {
        // Favorites always come first
        if (a.isFavorite && !b.isFavorite) return -1;
        if (!a.isFavorite && b.isFavorite) return 1;

        switch (sortBy) {
            case "name":
                return a.name.localeCompare(b.name);
            case "oldest":
                return (
                    new Date(a.meetDate).getTime() -
                    new Date(b.meetDate).getTime()
                );
            case "interactions":
                return (
                    (b.interactions?.length ?? 0) -
                    (a.interactions?.length ?? 0)
                );
            case "newest":
            default:
                return (
                    new Date(b.meetDate).getTime() -
                    new Date(a.meetDate).getTime()
                );
        }
    });

    const addPerson = () => {
        if (name.trim() === "") return;

        const newPerson: PersonMet = {
            id: Date.now().toString(),
            name: name.trim(),
            meetDate: new Date().toLocaleDateString(),
            somethingInteresting: somethingInteresting.trim() || undefined,
            whereMet: whereMet.trim() || undefined,
            thingsTheyLike:
                selectedLikes.length > 0 ? selectedLikes : undefined,
            tags: selectedTags.length > 0 ? selectedTags : undefined,
            birthday: birthday || undefined,
        };

        setUserProgress({ peopleMet: [newPerson, ...people] });
        setName("");
        setSomethingInteresting("");
        setWhereMet("");
        setSelectedLikes([]);
        setSelectedTags([]);
        setBirthday("");
        setShowAddModal(false);
    };

    const removePerson = async (id: string, personName: string) => {
        const confirmed = await confirm({
            title: "Remove Person",
            message: `Are you sure you want to remove ${personName}? This cannot be undone.`,
            confirmLabel: "Remove",
            variant: "danger",
        });
        if (confirmed) {
            setUserProgress({
                peopleMet: people.filter((person) => person.id !== id),
            });
        }
    };

    const startEditing = (person: PersonMet) => {
        setEditingId(person.id);
        setEditInteresting(person.somethingInteresting || "");
    };

    const saveEdit = (id: string) => {
        setUserProgress({
            peopleMet: people.map((person) =>
                person.id === id
                    ? {
                          ...person,
                          somethingInteresting:
                              editInteresting.trim() || undefined,
                      }
                    : person,
            ),
        });
        setEditingId(null);
        setEditInteresting("");
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditInteresting("");
    };

    const renderPersonItem = ({ item }: { item: PersonMet }) => {
        const isEditing = editingId === item.id;

        return (
            <div>
                <Card
                    variant="elevated"
                    className="flex justify-between items-start mb-3"
                >
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-amber-900 dark:text-amber-200">
                            {item.name}
                        </h3>
                        <p className="text-xs mt-1 text-amber-600 dark:text-amber-400">
                            <Calendar size={11} className="inline mr-0.5" /> Met
                            on: {item.meetDate}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        {!isEditing && (
                            <>
                                <button
                                    onClick={() => startEditing(item)}
                                    className="p-2 rounded-lg transition-colors text-amber-600 hover:bg-amber-100 dark:text-amber-400 dark:hover:bg-gray-700"
                                    title="Edit"
                                    aria-label={`Edit ${item.name}`}
                                >
                                    <Edit2 size={16} />
                                </button>
                                <button
                                    onClick={() =>
                                        removePerson(item.id, item.name)
                                    }
                                    className="p-2 rounded-lg transition-colors text-red-500 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
                                    title="Remove"
                                    aria-label={`Remove ${item.name}`}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </>
                        )}
                    </div>
                </Card>

                {isEditing ? (
                    <div className="space-y-3 mt-3 pt-3 border-t border-amber-200 dark:border-gray-600">
                        <div>
                            <label className="block text-xs font-medium mb-1 text-amber-800 dark:text-amber-300">
                                Something Interesting:
                            </label>
                            <textarea
                                value={editInteresting}
                                onChange={(e) =>
                                    setEditInteresting(e.target.value)
                                }
                                placeholder="Something interesting about them..."
                                className="w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 resize-none border-amber-200 focus:ring-amber-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-amber-500 dark:placeholder-gray-500"
                                rows={2}
                            />
                        </div>
                        <div className="flex gap-2 justify-end">
                            <button
                                onClick={cancelEdit}
                                className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-xl transition-all active:scale-[0.98] bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                            >
                                <X size={14} />
                                Cancel
                            </button>
                            <button
                                onClick={() => saveEdit(item.id)}
                                className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-xl font-medium transition-all active:scale-[0.98] bg-gradient-to-r from-orange-400 to-amber-400 text-white shadow-sm hover:shadow-md"
                            >
                                <Save size={14} />
                                Save
                            </button>
                        </div>
                    </div>
                ) : (
                    <Card variant="elevated" className="mt-3 space-y-2">
                        {item.somethingInteresting && (
                            <Card className="rounded-lg p-3 border bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
                                <p className="text-xs font-medium mb-1 text-blue-700 dark:text-blue-400">
                                    <Sparkles
                                        size={11}
                                        className="inline mr-0.5"
                                    />{" "}
                                    Something Interesting:
                                </p>
                                <p className="text-sm italic text-blue-900 dark:text-blue-300">
                                    "{item.somethingInteresting}"
                                </p>
                            </Card>
                        )}
                    </Card>
                )}
            </div>
        );
    };

    return (
        <ScreenContainer>
            <ConfirmDialog {...dialogProps} />

            {/* ── Add Person Modal ── */}
            {showAddModal && (
                <Card
                    variant="elevated"
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                >
                    <div
                        className="absolute inset-0 bg-black/40 dark:bg-black/60"
                        onClick={() => setShowAddModal(false)}
                    />
                    <div className="relative w-full max-w-md max-h-[85vh] overflow-y-auto rounded-2xl border-2 shadow-xl p-5 space-y-3 bg-white border-amber-100 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-amber-900 dark:text-amber-200">
                                Add a New Person
                            </h2>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="p-1.5 rounded-lg transition-colors text-amber-500 hover:bg-amber-100 dark:text-gray-400 dark:hover:bg-gray-700"
                                aria-label="Close"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Name + Where Met */}
                        <div className="grid grid-cols-2 gap-2">
                            <input
                                type="text"
                                placeholder="Name *"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 border-amber-200 focus:ring-amber-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-amber-500 dark:placeholder-gray-500"
                            />
                            <input
                                type="text"
                                placeholder="Where you met"
                                value={whereMet}
                                onChange={(e) => setWhereMet(e.target.value)}
                                className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 border-amber-200 focus:ring-amber-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-amber-500 dark:placeholder-gray-500"
                            />
                        </div>

                        {/* Something Interesting */}
                        <input
                            type="text"
                            placeholder="Something interesting about them"
                            value={somethingInteresting}
                            onChange={(e) =>
                                setSomethingInteresting(e.target.value)
                            }
                            className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 border-amber-200 focus:ring-amber-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-amber-500 dark:placeholder-gray-500"
                        />

                        {/* Birthday */}
                        <div>
                            <label className="block text-[11px] font-medium mb-1 text-amber-700 dark:text-amber-300">
                                <Cake size={11} className="inline mr-0.5" />{" "}
                                Birthday
                            </label>
                            <input
                                type="date"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                                className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 border-amber-200 focus:ring-amber-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-amber-500"
                            />
                        </div>

                        {/* Things They Like */}
                        <div>
                            <label className="block text-[11px] font-medium mb-1 text-amber-700 dark:text-amber-300">
                                <Heart size={11} className="inline mr-0.5" />{" "}
                                Things they like
                            </label>
                            <div className="flex flex-wrap gap-1.5">
                                {THINGS_THEY_LIKE_OPTIONS.map((like) => (
                                    <button
                                        key={like}
                                        type="button"
                                        onClick={() =>
                                            setSelectedLikes((prev) =>
                                                prev.includes(like)
                                                    ? prev.filter(
                                                          (l) => l !== like,
                                                      )
                                                    : [...prev, like],
                                            )
                                        }
                                        className={`text-[11px] px-2.5 py-1 rounded-full font-medium transition-all active:scale-95 ${
                                            selectedLikes.includes(like)
                                                ? "bg-purple-500 text-white shadow-sm dark:bg-purple-600"
                                                : "bg-purple-50 text-purple-600 border border-purple-200 hover:bg-purple-100 dark:bg-gray-700 dark:text-purple-300 dark:border-gray-600 dark:hover:bg-gray-600"
                                        }`}
                                    >
                                        {like}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="block text-[11px] font-medium mb-1 text-amber-700 dark:text-amber-300">
                                <Tag size={11} className="inline mr-0.5" />{" "}
                                Relationship
                            </label>
                            <div className="flex flex-wrap gap-1.5">
                                {RELATIONSHIP_TAGS.map((tag) => (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() =>
                                            setSelectedTags((prev) =>
                                                prev.includes(tag)
                                                    ? prev.filter(
                                                          (t) => t !== tag,
                                                      )
                                                    : [...prev, tag],
                                            )
                                        }
                                        className={`text-[11px] px-2.5 py-1 rounded-full font-medium transition-all active:scale-95 ${
                                            selectedTags.includes(tag)
                                                ? "bg-amber-500 text-white shadow-sm dark:bg-amber-600"
                                                : "bg-amber-50 text-amber-600 border border-amber-200 hover:bg-amber-100 dark:bg-gray-700 dark:text-amber-300 dark:border-gray-600 dark:hover:bg-gray-600"
                                        }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <Button onClick={addPerson} className="w-full">
                            Add Person
                        </Button>
                    </div>
                </Card>
            )}

            <div>
                {people.length === 0 ? (
                    <Card className="rounded-2xl p-8 text-center border-2 border-dashed border-amber-200 bg-amber-50/50 dark:border-gray-600 dark:bg-gray-800/50">
                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-amber-100 dark:bg-gray-700">
                                <Users
                                    size={28}
                                    className="text-amber-500 dark:text-amber-400"
                                />
                            </div>
                        </div>
                        <h3 className="font-semibold mb-2 text-amber-900 dark:text-gray-200">
                            No people added yet
                        </h3>
                        <p className="text-sm mb-4 text-amber-700 dark:text-gray-400">
                            Met someone new during a challenge? Add them here to
                            remember the connection!{" "}
                            <Handshake
                                size={14}
                                className="inline text-amber-500"
                            />
                        </p>
                        <Button onClick={() => setShowAddModal(true)} size="md">
                            Add Your First Person
                        </Button>
                    </Card>
                ) : (
                    <>
                        {/* Search bar */}
                        <div className="relative mb-4">
                            <Search
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400 dark:text-gray-500"
                            />
                            <input
                                type="text"
                                placeholder="Search people…"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 text-sm border rounded-xl focus:outline-none focus:ring-2 border-amber-200 bg-white focus:ring-amber-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-amber-500 dark:placeholder-gray-500"
                            />
                        </div>

                        {/* Toolbar */}
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                {/* Sort selector */}
                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={(e) =>
                                            setSortBy(
                                                e.target.value as typeof sortBy,
                                            )
                                        }
                                        className="appearance-none pl-6 pr-2 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer bg-transparent text-amber-700 hover:bg-amber-100 dark:text-amber-400 dark:hover:bg-gray-700 focus:outline-none"
                                    >
                                        <option value="newest">Newest</option>
                                        <option value="oldest">Oldest</option>
                                        <option value="name">Name A–Z</option>
                                        <option value="interactions">
                                            Most interactions
                                        </option>
                                    </select>
                                    <ArrowUpDown
                                        size={12}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 text-amber-500 dark:text-amber-400 pointer-events-none"
                                    />
                                </div>
                                <div className="w-px h-4 bg-amber-200 dark:bg-gray-600" />
                                <p className="text-xs text-amber-500 dark:text-gray-500">
                                    {sortedPeople.length === people.length
                                        ? `${people.length} ${people.length === 1 ? "person" : "people"}`
                                        : `${sortedPeople.length} of ${people.length}`}
                                </p>
                            </div>
                            <div className="flex items-center gap-1">
                                <Button
                                    onClick={() => setIsCompact(!isCompact)}
                                    variant="icon"
                                    title={
                                        isCompact
                                            ? "Expanded view"
                                            : "Compact view"
                                    }
                                    aria-label={
                                        isCompact
                                            ? "Switch to expanded view"
                                            : "Switch to compact view"
                                    }
                                >
                                    {isCompact ? (
                                        <LayoutList size={12} />
                                    ) : (
                                        <List size={12} />
                                    )}
                                </Button>
                                <Button
                                    onClick={() => setShowAddModal(true)}
                                    variant="icon"
                                    aria-label="Add person"
                                >
                                    <Plus size={12} />
                                </Button>
                            </div>
                        </div>

                        {sortedPeople.length === 0 ? (
                            <Card className="text-center">
                                <p className="text-sm text-amber-700 dark:text-gray-400">
                                    No people match "{searchQuery}"
                                </p>
                            </Card>
                        ) : isCompact ? (
                            <div>
                                <div className="flex items-center gap-3 mb-3 px-2 bg-amber-50 border border-amber-200 rounded-lg dark:bg-gray-700/50 dark:border-gray-600" />
                                {sortedPeople.map((person, index) => (
                                    <div
                                        key={person.id}
                                        className={`flex items-center bg-white dark:bg-gray-800/50 ${
                                            index !== 0
                                                ? "border-t border-amber-100 dark:border-gray-700"
                                                : ""
                                        }`}
                                    >
                                        {/* Clickable row */}
                                        <button
                                            onClick={() =>
                                                setSelectedScreen(
                                                    `person-detail-${person.id}`,
                                                )
                                            }
                                            className="flex-1 flex items-center justify-between pl-4 pr-4 py-3 text-left transition-colors hover:bg-amber-50 dark:hover:bg-gray-750"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-amber-100 text-amber-700 dark:bg-gray-700 dark:text-amber-300">
                                                    {person.name
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm text-amber-900 dark:text-amber-200">
                                                        {person.name}
                                                    </p>
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <p className="text-xs text-amber-500 dark:text-gray-500">
                                                            {person.meetDate}
                                                        </p>
                                                        {person.whereMet && (
                                                            <span className="inline-flex items-center gap-0.5 text-xs text-amber-400 dark:text-gray-500">
                                                                <MapPin
                                                                    size={10}
                                                                />
                                                                {
                                                                    person.whereMet
                                                                }
                                                            </span>
                                                        )}
                                                        {person.birthday && (
                                                            <span className="inline-flex items-center gap-0.5 text-xs text-amber-400 dark:text-gray-500">
                                                                <Cake
                                                                    size={10}
                                                                />
                                                                {new Date(
                                                                    person.birthday +
                                                                        "T00:00",
                                                                ).toLocaleDateString(
                                                                    "en-US",
                                                                    {
                                                                        month: "short",
                                                                        day: "numeric",
                                                                    },
                                                                )}
                                                            </span>
                                                        )}
                                                        {(person.interactions
                                                            ?.length ?? 0) >
                                                            0 && (
                                                            <span className="inline-flex items-center gap-0.5 text-xs text-amber-400 dark:text-gray-500">
                                                                <MessageCircle
                                                                    size={10}
                                                                />
                                                                {
                                                                    person
                                                                        .interactions!
                                                                        .length
                                                                }
                                                            </span>
                                                        )}
                                                    </div>
                                                    {person.tags &&
                                                        person.tags.length >
                                                            0 && (
                                                            <div className="flex gap-1 mt-1 flex-wrap">
                                                                {person.tags.map(
                                                                    (tag) => (
                                                                        <span
                                                                            key={
                                                                                tag
                                                                            }
                                                                            className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-gray-700 dark:text-amber-300"
                                                                        >
                                                                            {
                                                                                tag
                                                                            }
                                                                        </span>
                                                                    ),
                                                                )}
                                                            </div>
                                                        )}
                                                </div>
                                            </div>
                                            {/* Favorite toggle */}
                                            <button
                                                onClick={() =>
                                                    toggleFavorite(person.id)
                                                }
                                                className="pl-3 pr-1 py-3 self-stretch flex items-center"
                                                aria-label={
                                                    person.isFavorite
                                                        ? `Unpin ${person.name}`
                                                        : `Pin ${person.name}`
                                                }
                                            >
                                                <Star
                                                    size={14}
                                                    className={
                                                        person.isFavorite
                                                            ? "fill-amber-400 text-amber-400"
                                                            : "text-amber-200 dark:text-gray-600 hover:text-amber-400 dark:hover:text-amber-400"
                                                    }
                                                />
                                            </button>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            sortedPeople.map((person) => (
                                <div key={person.id}>
                                    {renderPersonItem({ item: person })}
                                </div>
                            ))
                        )}
                    </>
                )}
            </div>
        </ScreenContainer>
    );
};

export default PeopleScreen;

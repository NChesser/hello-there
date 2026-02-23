import { useState } from "react";

// Store
import { useUserProgress, useSetUserProgressStore } from "../store/store";

// Components
import ScreenContainer from "../components/ScreenContainer";
import Button from "../components/Button";
import ConfirmDialog from "../components/ConfirmDialog";
import TabBar from "../components/TabBar";
import { useConfirmDialog } from "../hooks/useConfirmDialog";
import Card from "../components/Card";


// Icons
import {
    Edit2,
    Trash2,
    Save,
    X,
    Star,
    Plus,
    Send,
    MapPin,
    Heart,
    Tag,
    Cake,
    MessageCircle,
    Sprout,
    Calendar,
    Sparkles,
} from "lucide-react";

// Types
import type { PersonMet, Interaction, PersonalNote } from "../types/types";
import { RELATIONSHIP_TAGS, THINGS_THEY_LIKE_OPTIONS } from "../types/types";

interface PersonDetailScreenProps {
    personId: string;
    onBack: () => void;
}

const PersonDetailScreen = ({ personId, onBack }: PersonDetailScreenProps) => {
    const userProgress = useUserProgress();
    const setUserProgress = useSetUserProgressStore();
    const { dialogProps, confirm } = useConfirmDialog();

    const people: PersonMet[] = userProgress.peopleMet || [];
    const person = people.find((p) => p.id === personId);

    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState("");
    const [editInteresting, setEditInteresting] = useState("");
    const [editWhereMet, setEditWhereMet] = useState("");
    const [editThingsTheyLike, setEditThingsTheyLike] = useState<string[]>([]);
    const [editTags, setEditTags] = useState<string[]>([]);
    const [editBirthday, setEditBirthday] = useState("");
    const [newInteractionText, setNewInteractionText] = useState("");
    const [isAddingInteraction, setIsAddingInteraction] = useState(false);
    const [newNoteText, setNewNoteText] = useState("");
    const [isAddingNote, setIsAddingNote] = useState(false);
    const [detailTab, setDetailTab] = useState<"about" | "moments" | "growth">(
        "about",
    );

    if (!person) {
        return (
            <ScreenContainer>
                <div className="text-center py-12">
                    <p className="text-amber-700 dark:text-gray-400">
                        Person not found.
                    </p>
                    <button
                        onClick={onBack}
                        className="mt-4 text-sm font-medium text-amber-600 dark:text-amber-400 hover:underline"
                    >
                        ← Back to People
                    </button>
                </div>
            </ScreenContainer>
        );
    }

    const startEditing = () => {
        setIsEditing(true);
        setEditName(person.name);
        setEditInteresting(person.somethingInteresting || "");
        setEditWhereMet(person.whereMet || "");
        setEditThingsTheyLike(person.thingsTheyLike || []);
        setEditTags(person.tags || []);
        setEditBirthday(person.birthday || "");
    };

    const saveEdit = () => {
        setUserProgress({
            peopleMet: people.map((p) =>
                p.id === personId
                    ? {
                          ...p,
                          name: editName.trim() || p.name,
                          somethingInteresting:
                              editInteresting.trim() || undefined,
                          whereMet: editWhereMet.trim() || undefined,
                          thingsTheyLike:
                              editThingsTheyLike.length > 0
                                  ? editThingsTheyLike
                                  : undefined,
                          tags: editTags.length > 0 ? editTags : undefined,
                          birthday: editBirthday || undefined,
                      }
                    : p,
            ),
        });
        setIsEditing(false);
    };

    const cancelEdit = () => {
        setIsEditing(false);
    };

    const toggleFavorite = () => {
        setUserProgress({
            peopleMet: people.map((p) =>
                p.id === personId ? { ...p, isFavorite: !p.isFavorite } : p,
            ),
        });
    };

    const addInteraction = () => {
        if (!newInteractionText.trim()) return;
        const interaction: Interaction = {
            id: Date.now().toString(),
            text: newInteractionText.trim(),
            date: new Date().toLocaleDateString(),
        };
        setUserProgress({
            peopleMet: people.map((p) =>
                p.id === personId
                    ? {
                          ...p,
                          interactions: [
                              interaction,
                              ...(p.interactions || []),
                          ],
                      }
                    : p,
            ),
        });
        setNewInteractionText("");
        setIsAddingInteraction(false);
    };

    const removeInteraction = (interactionId: string) => {
        setUserProgress({
            peopleMet: people.map((p) =>
                p.id === personId
                    ? {
                          ...p,
                          interactions: (p.interactions || []).filter(
                              (i) => i.id !== interactionId,
                          ),
                      }
                    : p,
            ),
        });
    };

    const addNote = () => {
        if (!newNoteText.trim()) return;
        const note: PersonalNote = {
            id: Date.now().toString(),
            text: newNoteText.trim(),
        };
        setUserProgress({
            peopleMet: people.map((p) =>
                p.id === personId
                    ? {
                          ...p,
                          personalNotes: [note, ...(p.personalNotes || [])],
                      }
                    : p,
            ),
        });
        setNewNoteText("");
        setIsAddingNote(false);
    };

    const removeNote = (noteId: string) => {
        setUserProgress({
            peopleMet: people.map((p) =>
                p.id === personId
                    ? {
                          ...p,
                          personalNotes: (p.personalNotes || []).filter(
                              (n) => n.id !== noteId,
                          ),
                      }
                    : p,
            ),
        });
    };

    const removePerson = async () => {
        const confirmed = await confirm({
            title: "Remove Person",
            message: `Are you sure you want to remove ${person.name}? This cannot be undone.`,
            confirmLabel: "Remove",
            variant: "danger",
        });
        if (confirmed) {
            setUserProgress({
                peopleMet: people.filter((p) => p.id !== personId),
            });
            onBack();
        }
    };

    return (
        <ScreenContainer>
            <ConfirmDialog {...dialogProps} />

            {/* Person header */}
            <Card variant="elevated" className="overflow-hidden">
                {/* Top section: avatar, name, actions */}
                <div className="flex items-start gap-3 p-5 pb-3">
                    <div className="relative flex-shrink-0">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold bg-amber-100 text-amber-700 dark:bg-gray-700 dark:text-amber-300">
                            {person.name.charAt(0).toUpperCase()}
                        </div>
                        <button
                            onClick={toggleFavorite}
                            className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full flex items-center justify-center bg-white shadow-sm border border-amber-200 dark:bg-gray-700 dark:border-gray-600 transition-transform active:scale-90"
                            aria-label={
                                person.isFavorite
                                    ? "Remove from favorites"
                                    : "Add to favorites"
                            }
                        >
                            <Star
                                size={12}
                                className={
                                    person.isFavorite
                                        ? "fill-amber-400 text-amber-400"
                                        : "text-amber-300 dark:text-gray-500"
                                }
                            />
                        </button>
                    </div>
                    <div className="flex-1 min-w-0">
                        {isEditing ? (
                            <input
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="text-xl font-bold w-full p-1 border-b-2 bg-transparent focus:outline-none border-amber-300 text-amber-900 dark:border-gray-600 dark:text-amber-200"
                            />
                        ) : (
                            <h2 className="text-xl font-bold text-amber-900 dark:text-amber-200 truncate">
                                {person.name}
                            </h2>
                        )}
                        {person.tags && person.tags.length > 0 && (
                            <div className="flex gap-1 mt-1 flex-wrap">
                                {person.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-gray-600 dark:text-amber-300 font-medium"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                        {/* Meta chips row */}
                        <div className="flex items-center gap-3 flex-wrap mt-2">
                            <span className="inline-flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
                                <Calendar size={11} /> {person.meetDate}
                            </span>
                            {person.birthday && (
                                <span className="inline-flex items-center gap-1 text-xs text-amber-500 dark:text-gray-400">
                                    <Cake size={11} />{" "}
                                    {new Date(
                                        person.birthday + "T00:00",
                                    ).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </span>
                            )}
                            {person.whereMet && (
                                <span className="inline-flex items-center gap-1 text-xs text-amber-500 dark:text-gray-400">
                                    <MapPin size={11} /> {person.whereMet}
                                </span>
                            )}
                        </div>
                    </div>
                    {/* Action buttons */}
                    {!isEditing && (
                        <div className="flex gap-1.5 flex-shrink-0">
                            <button
                                onClick={startEditing}
                                className="p-2 rounded-lg transition-colors text-amber-600 hover:bg-amber-100 dark:text-amber-400 dark:hover:bg-gray-700"
                                aria-label="Edit"
                            >
                                <Edit2 size={16} />
                            </button>
                            <button
                                onClick={removePerson}
                                className="p-2 rounded-lg transition-colors text-red-400 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                                aria-label="Remove"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Something Interesting quote */}
                {!isEditing && person.somethingInteresting && (
                    <div className="mx-5 mb-4 rounded-lg px-4 py-3 border-l-4 border-blue-300 bg-blue-50/70 dark:bg-blue-900/15 dark:border-blue-600">
                        <p className="text-xs font-medium mb-0.5 text-blue-600 dark:text-blue-400">
                            <Sparkles size={11} className="inline mr-0.5" />{" "}
                            Something Interesting
                        </p>
                        <p className="text-sm italic text-blue-800 dark:text-blue-300">
                            "{person.somethingInteresting}"
                        </p>
                    </div>
                )}

                {/* Details section */}
                {isEditing && (
                    <div className="space-y-3 px-5 pb-5 pt-3 border-t border-amber-200 dark:border-gray-600">
                        {/* Something Interesting + Where Met */}
                        <div>
                            <label className="block text-[11px] font-medium mb-1 text-amber-700 dark:text-amber-300">
                                Something Interesting
                            </label>
                            <textarea
                                value={editInteresting}
                                onChange={(e) =>
                                    setEditInteresting(e.target.value)
                                }
                                placeholder="Something interesting about them..."
                                className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 resize-none border-amber-200 focus:ring-amber-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-amber-500 dark:placeholder-gray-500"
                                rows={2}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="block text-[11px] font-medium mb-1 text-amber-700 dark:text-amber-300">
                                    <MapPin
                                        size={11}
                                        className="inline mr-0.5"
                                    />{" "}
                                    Where Met
                                </label>
                                <input
                                    type="text"
                                    value={editWhereMet}
                                    onChange={(e) =>
                                        setEditWhereMet(e.target.value)
                                    }
                                    placeholder="Coffee shop, gym…"
                                    className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 border-amber-200 focus:ring-amber-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-amber-500 dark:placeholder-gray-500"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-medium mb-1 text-amber-700 dark:text-amber-300">
                                    <Cake size={11} className="inline mr-0.5" />{" "}
                                    Birthday
                                </label>
                                <input
                                    type="date"
                                    value={editBirthday}
                                    onChange={(e) =>
                                        setEditBirthday(e.target.value)
                                    }
                                    className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 border-amber-200 focus:ring-amber-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-amber-500"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[11px] font-medium mb-1 text-amber-700 dark:text-amber-300">
                                <Heart size={11} className="inline mr-0.5" />{" "}
                                Things They Like
                            </label>
                            <div className="flex flex-wrap gap-1.5">
                                {THINGS_THEY_LIKE_OPTIONS.map((like) => (
                                    <button
                                        key={like}
                                        type="button"
                                        onClick={() =>
                                            setEditThingsTheyLike((prev) =>
                                                prev.includes(like)
                                                    ? prev.filter(
                                                          (l) => l !== like,
                                                      )
                                                    : [...prev, like],
                                            )
                                        }
                                        className={`text-[11px] px-2.5 py-1 rounded-full font-medium transition-all active:scale-95 ${
                                            editThingsTheyLike.includes(like)
                                                ? "bg-purple-500 text-white shadow-sm dark:bg-purple-600"
                                                : "bg-purple-50 text-purple-600 border border-purple-200 hover:bg-purple-100 dark:bg-gray-700 dark:text-purple-300 dark:border-gray-600 dark:hover:bg-gray-600"
                                        }`}
                                    >
                                        {like}
                                    </button>
                                ))}
                            </div>
                        </div>
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
                                            setEditTags((prev) =>
                                                prev.includes(tag)
                                                    ? prev.filter(
                                                          (t) => t !== tag,
                                                      )
                                                    : [...prev, tag],
                                            )
                                        }
                                        className={`text-[11px] px-2.5 py-1 rounded-full font-medium transition-all active:scale-95 ${
                                            editTags.includes(tag)
                                                ? "bg-amber-500 text-white shadow-sm dark:bg-amber-600"
                                                : "bg-amber-50 text-amber-600 border border-amber-200 hover:bg-amber-100 dark:bg-gray-700 dark:text-amber-300 dark:border-gray-600 dark:hover:bg-gray-600"
                                        }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-2 justify-end pt-1">
                            <Button
                                onClick={cancelEdit}
                                variant="cancel"
                                size="sm"
                            >
                                <X size={14} />
                                Cancel
                            </Button>
                            <Button onClick={saveEdit} size="sm">
                                <Save size={14} />
                                Save
                            </Button>
                        </div>
                    </div>
                )}
            </Card>

            {/* ── Section Tabs ── */}
            <TabBar
                tabs={[
                    { id: "about" as const, label: "About", icon: Heart },
                    {
                        id: "moments" as const,
                        label: "Moments",
                        icon: MessageCircle,
                        badge:
                            (person.interactions?.length ?? 0) > 0 ? (
                                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-200 text-amber-700 dark:bg-gray-600 dark:text-amber-300">
                                    {person.interactions!.length}
                                </span>
                            ) : undefined,
                    },
                    {
                        id: "growth" as const,
                        label: "Growth",
                        icon: Sprout,
                        badge:
                            (person.personalNotes?.length ?? 0) > 0 ? (
                                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-200 text-green-700 dark:bg-gray-600 dark:text-green-300">
                                    {person.personalNotes!.length}
                                </span>
                            ) : undefined,
                    },
                ]}
                activeTab={detailTab}
                onTabChange={setDetailTab}
                variant="dark"
                className="mt-4"
            />

            {/* ── About Them Tab ── */}
            {detailTab === "about" && (
                <div className="border-2 rounded-2xl p-5 shadow-sm mt-3 bg-white border-amber-200 dark:bg-gray-800 dark:border-gray-700">
                    <div className="space-y-3">
                        {person.whereMet && (
                            <div className="rounded-lg p-4 border bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800">
                                <p className="text-xs font-medium mb-1.5 flex items-center gap-1 text-green-700 dark:text-green-400">
                                    <MapPin size={12} /> Where You Met
                                </p>
                                <p className="text-sm text-green-900 dark:text-green-300">
                                    {person.whereMet}
                                </p>
                            </div>
                        )}

                        {person.thingsTheyLike &&
                            person.thingsTheyLike.length > 0 && (
                                <div className="rounded-lg p-4 border bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800">
                                    <p className="text-xs font-medium mb-1.5 flex items-center gap-1 text-purple-700 dark:text-purple-400">
                                        <Heart size={12} /> Things They Like
                                    </p>
                                    <div className="flex flex-wrap gap-1.5 mt-1">
                                        {person.thingsTheyLike.map((like) => (
                                            <span
                                                key={like}
                                                className="text-xs px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-800/40 dark:text-purple-300 font-medium"
                                            >
                                                {like}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                        {person.birthday && (
                            <div className="rounded-lg p-4 border bg-pink-50 border-pink-200 dark:bg-pink-900/20 dark:border-pink-800">
                                <p className="text-xs font-medium mb-1.5 flex items-center gap-1 text-pink-700 dark:text-pink-400">
                                    <Cake size={12} /> Birthday
                                </p>
                                <p className="text-sm text-pink-900 dark:text-pink-300">
                                    {new Date(
                                        person.birthday + "T00:00",
                                    ).toLocaleDateString("en-US", {
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                            </div>
                        )}

                        {!person.whereMet &&
                            !person.birthday &&
                            (!person.thingsTheyLike ||
                                person.thingsTheyLike.length === 0) && (
                                <div className="rounded-lg p-4 border border-dashed border-amber-200 dark:border-gray-600">
                                    <p className="text-sm text-amber-500 dark:text-gray-500 text-center">
                                        No details yet — tap Edit to add some
                                    </p>
                                </div>
                            )}
                    </div>
                </div>
            )}

            {/* ── Moments Tab ── */}
            {detailTab === "moments" && (
                <div className="border-2 rounded-2xl p-5 shadow-sm mt-3 bg-white border-amber-200 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-semibold text-amber-900 dark:text-amber-200 flex items-center gap-2">
                            <MessageCircle
                                size={16}
                                className="text-amber-600 dark:text-amber-400"
                            />
                            Moments
                            {(person.interactions?.length ?? 0) > 0 && (
                                <span className="text-xs font-normal text-amber-500 dark:text-gray-400">
                                    ({person.interactions!.length})
                                </span>
                            )}
                        </h3>
                        {!isAddingInteraction && (
                            <Button
                                onClick={() => setIsAddingInteraction(true)}
                                variant="ghost"
                                size="sm"
                            >
                                <Plus size={14} />
                                Add
                            </Button>
                        )}
                    </div>

                    {/* Add interaction input */}
                    {isAddingInteraction && (
                        <div className="mb-4 flex gap-2">
                            <input
                                type="text"
                                value={newInteractionText}
                                onChange={(e) =>
                                    setNewInteractionText(e.target.value)
                                }
                                onKeyDown={(e) =>
                                    e.key === "Enter" && addInteraction()
                                }
                                placeholder="What happened? e.g. Chatted at the café…"
                                className="flex-1 p-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 border-amber-200 focus:ring-amber-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-amber-500 dark:placeholder-gray-500"
                                autoFocus
                            />
                            <button
                                onClick={addInteraction}
                                disabled={!newInteractionText.trim()}
                                className="p-2.5 rounded-lg transition-colors disabled:opacity-40 bg-amber-500 text-white hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-500"
                                aria-label="Save interaction"
                            >
                                <Send size={16} />
                            </button>
                            <button
                                onClick={() => {
                                    setIsAddingInteraction(false);
                                    setNewInteractionText("");
                                }}
                                className="p-2.5 rounded-lg transition-colors text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                                aria-label="Cancel"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    )}

                    {/* Timeline */}
                    {!person.interactions ||
                    person.interactions.length === 0 ? (
                        <div className="rounded-lg p-6 text-center border border-dashed border-amber-200 dark:border-gray-600">
                            <p className="text-sm text-amber-500 dark:text-gray-500">
                                No interactions logged yet
                            </p>
                            <p className="text-xs mt-1 text-amber-400 dark:text-gray-600">
                                Tap “Add” to record your first one!
                            </p>
                        </div>
                    ) : (
                        <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-amber-200 dark:bg-gray-600" />

                            <div className="space-y-3">
                                {person.interactions.map((interaction) => (
                                    <div
                                        key={interaction.id}
                                        className="flex gap-3 group relative"
                                    >
                                        {/* Dot */}
                                        <div className="w-[15px] flex-shrink-0 pt-1.5">
                                            <div className="w-[9px] h-[9px] rounded-full border-2 border-amber-400 bg-white dark:bg-gray-800 dark:border-amber-500 relative z-10" />
                                        </div>
                                        {/* Content */}
                                        <div className="flex-1 rounded-lg p-3 border transition-colors bg-amber-50/50 border-amber-100 dark:bg-gray-700/30 dark:border-gray-600">
                                            <p className="text-sm text-amber-900 dark:text-gray-200">
                                                {interaction.text}
                                            </p>
                                            <p className="text-xs mt-1 text-amber-400 dark:text-gray-500">
                                                {interaction.date}
                                            </p>
                                        </div>
                                        {/* Remove button (on hover) */}
                                        <button
                                            onClick={() =>
                                                removeInteraction(
                                                    interaction.id,
                                                )
                                            }
                                            className="self-center p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                                            aria-label="Remove interaction"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* ── Growth Tab ── */}
            {detailTab === "growth" && (
                <div className="border-2 rounded-2xl p-5 shadow-sm mt-3 bg-white border-amber-200 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-semibold text-amber-900 dark:text-amber-200 flex items-center gap-2">
                            <Sprout
                                size={16}
                                className="text-green-600 dark:text-green-400"
                            />
                            Growth
                            {(person.personalNotes?.length ?? 0) > 0 && (
                                <span className="text-xs font-normal text-amber-500 dark:text-gray-400">
                                    ({person.personalNotes!.length})
                                </span>
                            )}
                        </h3>
                        {!isAddingNote && (
                            <Button
                                onClick={() => setIsAddingNote(true)}
                                variant="ghost"
                                size="sm"
                            >
                                <Plus size={14} />
                                Add
                            </Button>
                        )}
                    </div>

                    {/* Add note input */}
                    {isAddingNote && (
                        <div className="mb-4 flex gap-2">
                            <input
                                type="text"
                                value={newNoteText}
                                onChange={(e) => setNewNoteText(e.target.value)}
                                onKeyDown={(e) =>
                                    e.key === "Enter" && addNote()
                                }
                                placeholder="Add a personal note or reflection…"
                                className="flex-1 p-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 border-amber-200 focus:ring-amber-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-amber-500 dark:placeholder-gray-500"
                                autoFocus
                            />
                            <button
                                onClick={addNote}
                                disabled={!newNoteText.trim()}
                                className="p-2.5 rounded-lg transition-colors disabled:opacity-40 bg-green-500 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500"
                                aria-label="Save note"
                            >
                                <Send size={16} />
                            </button>
                            <button
                                onClick={() => {
                                    setIsAddingNote(false);
                                    setNewNoteText("");
                                }}
                                className="p-2.5 rounded-lg transition-colors text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                                aria-label="Cancel"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    )}

                    {/* Notes list */}
                    {!person.personalNotes ||
                    person.personalNotes.length === 0 ? (
                        <div className="rounded-lg p-6 text-center border border-dashed border-amber-200 dark:border-gray-600">
                            <p className="text-sm text-amber-500 dark:text-gray-500">
                                No notes yet
                            </p>
                            <p className="text-xs mt-1 text-amber-400 dark:text-gray-600">
                                Tap "Add" to jot down a thought or reflection
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {person.personalNotes.map((note) => (
                                <div key={note.id} className="flex gap-2 group">
                                    <div className="flex-1 rounded-lg p-3 border transition-colors bg-green-50/50 border-green-100 dark:bg-gray-700/30 dark:border-gray-600">
                                        <p className="text-sm text-amber-900 dark:text-gray-200">
                                            {note.text}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => removeNote(note.id)}
                                        className="self-center p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                                        aria-label="Remove note"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </ScreenContainer>
    );
};

export default PersonDetailScreen;

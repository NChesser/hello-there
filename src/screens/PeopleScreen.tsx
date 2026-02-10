import { useState, useEffect } from 'react';

// Store
import { useUserProgress, useSetUserProgressStore } from '../store/store';

// Components
import ScreenContainer from '../components/ScreenContainer';
import Button from './Button';
import ConfirmDialog, { useConfirmDialog } from '../components/ConfirmDialog';

// Icons
import { Edit2, Trash2, Save, X, Users } from 'lucide-react';

// Theme
import { useTheme } from '../context/ThemeContext';

// Types
interface Person {
    id: string;
    name: string;
    date: string;
    notes?: string;
    somethingInteresting?: string;
}

// Screen Component
const PeopleScreen = () => {
    const { isDark } = useTheme();
    const userProgress = useUserProgress();
    const setUserProgress = useSetUserProgressStore();
    const { dialogProps, confirm } = useConfirmDialog();
    
    // Convert peopleMet string[] to Person[] for backwards compatibility
    const peopleFromProgress: Person[] = (userProgress.peopleMet || []).map(personId => {
        // Try to parse if it's JSON, otherwise create simple object
        try {
            const parsed = JSON.parse(personId);
            return parsed;
        } catch {
            return {
                id: personId,
                name: personId,
                date: new Date().toLocaleDateString(),
                notes: '',
                somethingInteresting: ''
            };
        }
    });
    
    const [people, setPeople] = useState<Person[]>(peopleFromProgress);
    const [name, setName] = useState('');
    const [notes, setNotes] = useState('');
    const [somethingInteresting, setSomethingInteresting] = useState('');
    const [activeTab, setActiveTab] = useState<'add' | 'list'>('list');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editNotes, setEditNotes] = useState('');
    const [editInteresting, setEditInteresting] = useState('');
    
    // Sync people to userProgress whenever it changes
    useEffect(() => {
        const serializedPeople = people.map(person => JSON.stringify(person));
        setUserProgress({
            peopleMet: serializedPeople
        });
    }, [people]);

    const addPerson = () => {
        if (name.trim() === '') return;

        const newPerson: Person = {
            id: Date.now().toString(),
            name: name.trim(),
            date: new Date().toLocaleDateString(),
            notes: notes.trim(),
            somethingInteresting: somethingInteresting.trim(),
        };

        setPeople([newPerson, ...people]);
        setName('');
        setNotes('');
        setSomethingInteresting('');
        setActiveTab('list');
    };

    const removePerson = async (id: string, personName: string) => {
        const confirmed = await confirm({
            title: 'Remove Person',
            message: `Are you sure you want to remove ${personName}? This cannot be undone.`,
            confirmLabel: 'Remove',
            variant: 'danger',
        });
        if (confirmed) {
            setPeople(people.filter(person => person.id !== id));
        }
    };

    const startEditing = (person: Person) => {
        setEditingId(person.id);
        setEditNotes(person.notes || '');
        setEditInteresting(person.somethingInteresting || '');
    };

    const saveEdit = (id: string) => {
        setPeople(people.map(person => 
            person.id === id 
                ? { ...person, notes: editNotes.trim(), somethingInteresting: editInteresting.trim() }
                : person
        ));
        setEditingId(null);
        setEditNotes('');
        setEditInteresting('');
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditNotes('');
        setEditInteresting('');
    };

    const renderPersonItem = ({ item }: { item: Person }) => {
        const isEditing = editingId === item.id;

        return (
            <div className={`border-2 rounded-xl p-4 mb-4 shadow-sm hover:shadow-md transition-all ${
                isDark 
                    ? 'border-gray-700 bg-gradient-to-br from-gray-800 to-gray-750' 
                    : 'border-amber-200 bg-gradient-to-br from-white to-amber-50'
            }`}>
                <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                        <h3 className={`text-lg font-bold ${isDark ? 'text-amber-200' : 'text-amber-900'}`}>{item.name}</h3>
                        <p className={`text-xs mt-1 ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>📅 Met on: {item.date}</p>
                    </div>
                    <div className="flex gap-2">
                        {!isEditing && (
                            <>
                                <button
                                    onClick={() => startEditing(item)}
                                    className={`p-2 rounded-lg transition-colors ${
                                        isDark ? 'text-amber-400 hover:bg-gray-700' : 'text-amber-600 hover:bg-amber-100'
                                    }`}
                                    title="Edit"
                                    aria-label={`Edit ${item.name}`}
                                >
                                    <Edit2 size={16} />
                                </button>
                                <button
                                    onClick={() => removePerson(item.id, item.name)}
                                    className={`p-2 rounded-lg transition-colors ${
                                        isDark ? 'text-red-400 hover:bg-red-900/30' : 'text-red-500 hover:bg-red-50'
                                    }`}
                                    title="Remove"
                                    aria-label={`Remove ${item.name}`}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {isEditing ? (
                    <div className={`space-y-3 mt-3 pt-3 border-t ${isDark ? 'border-gray-600' : 'border-amber-200'}`}>
                        <div>
                            <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>Notes:</label>
                            <textarea
                                value={editNotes}
                                onChange={(e) => setEditNotes(e.target.value)}
                                placeholder="Add notes..."
                                className={`w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 resize-none ${
                                    isDark 
                                        ? 'border-gray-600 bg-gray-700 text-gray-200 focus:ring-amber-500 placeholder-gray-500' 
                                        : 'border-amber-200 focus:ring-amber-300'
                                }`}
                                rows={2}
                            />
                        </div>
                        <div>
                            <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>Something Interesting:</label>
                            <textarea
                                value={editInteresting}
                                onChange={(e) => setEditInteresting(e.target.value)}
                                placeholder="Something interesting about them..."
                                className={`w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 resize-none ${
                                    isDark 
                                        ? 'border-gray-600 bg-gray-700 text-gray-200 focus:ring-amber-500 placeholder-gray-500' 
                                        : 'border-amber-200 focus:ring-amber-300'
                                }`}
                                rows={2}
                            />
                        </div>
                        <div className="flex gap-2 justify-end">
                            <button
                                onClick={cancelEdit}
                                className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg transition-colors ${
                                    isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                <X size={14} />
                                Cancel
                            </button>
                            <button
                                onClick={() => saveEdit(item.id)}
                                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gradient-to-r from-orange-400 to-amber-400 text-white rounded-lg hover:shadow-md transition-all active:scale-95"
                            >
                                <Save size={14} />
                                Save
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="mt-3 space-y-2">
                        {item.notes && (
                            <div className={`rounded-lg p-3 border ${
                                isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-amber-50 border-amber-200'
                            }`}>
                                <p className={`text-xs font-medium mb-1 ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>📝 Notes:</p>
                                <p className={`text-sm ${isDark ? 'text-gray-200' : 'text-amber-900'}`}>{item.notes}</p>
                            </div>
                        )}
                        {item.somethingInteresting && (
                            <div className={`rounded-lg p-3 border ${
                                isDark ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'
                            }`}>
                                <p className={`text-xs font-medium mb-1 ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>✨ Something Interesting:</p>
                                <p className={`text-sm italic ${isDark ? 'text-blue-300' : 'text-blue-900'}`}>"{item.somethingInteresting}"</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    return (
        <ScreenContainer>
            <ConfirmDialog {...dialogProps} />
            
            <div className="flex space-x-4 mb-4">
                <button
                    onClick={() => setActiveTab('list')}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                        activeTab === 'list' 
                            ? 'bg-gradient-to-r from-orange-400 to-amber-400 text-white' 
                            : isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                    }`}
                >
                    People Met
                </button>
                <button
                    onClick={() => setActiveTab('add')}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                        activeTab === 'add' 
                            ? 'bg-gradient-to-r from-orange-400 to-amber-400 text-white' 
                            : isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                    }`}
                >
                    Add Person
                </button>
            </div>
            <div className="mb-6"></div>
            {activeTab === 'add' && (
                <>
                    <div className={`mb-6 space-y-4 p-6 rounded-2xl border-2 shadow-sm ${
                        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-amber-100'
                    }`}>
                        <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-amber-200' : 'text-amber-900'}`}>Add a New Person</h2>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                                isDark 
                                    ? 'border-gray-600 bg-gray-700 text-gray-200 focus:ring-amber-500 placeholder-gray-500' 
                                    : 'border-amber-200 focus:ring-amber-300'
                            }`}
                        />
                        <input
                            type="text"
                            placeholder="Notes (optional)"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                                isDark 
                                    ? 'border-gray-600 bg-gray-700 text-gray-200 focus:ring-amber-500 placeholder-gray-500' 
                                    : 'border-amber-200 focus:ring-amber-300'
                            }`}
                        />
                        <input
                            type="text"
                            placeholder="Something Interesting (optional)"
                            value={somethingInteresting}
                            onChange={(e) => setSomethingInteresting(e.target.value)}
                            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                                isDark 
                                    ? 'border-gray-600 bg-gray-700 text-gray-200 focus:ring-amber-500 placeholder-gray-500' 
                                    : 'border-amber-200 focus:ring-amber-300'
                            }`}
                        />

                        <Button
                            onClick={addPerson}
                            className="w-full mt-4"
                        >
                            Add Person
                        </Button>
                    </div>
                </>
            )}

            {activeTab === 'list' && (
                <div>
                    {
                        people.length === 0 ? (
                            <div className={`rounded-2xl p-8 text-center border-2 border-dashed ${
                                isDark ? 'border-gray-600 bg-gray-800/50' : 'border-amber-200 bg-amber-50/50'
                            }`}>
                                <div className="flex justify-center mb-4">
                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                                        isDark ? 'bg-gray-700' : 'bg-amber-100'
                                    }`}>
                                        <Users size={28} className={isDark ? 'text-amber-400' : 'text-amber-500'} />
                                    </div>
                                </div>
                                <h3 className={`font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-amber-900'}`}>
                                    No people added yet
                                </h3>
                                <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-amber-700'}`}>
                                    Met someone new during a challenge? Add them here to remember the connection! 🤝
                                </p>
                                <button
                                    onClick={() => setActiveTab('add')}
                                    className="text-sm font-medium bg-gradient-to-r from-orange-400 to-amber-400 text-white px-4 py-2 rounded-lg hover:shadow-md transition-all"
                                >
                                    Add Your First Person
                                </button>
                            </div>
                        ) : (
                            people.map(person => (
                                <div key={person.id}>
                                    {renderPersonItem({ item: person })}
                                </div>
                            ))
                        )
                    }
                </div>
            )}
        </ScreenContainer>
    );
};

export default PeopleScreen;
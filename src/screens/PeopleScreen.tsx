import { useState } from 'react';

// Store
import { useUserProgress, useSetUserProgressStore } from '../store/store';

// Components
import ScreenContainer from '../components/ScreenContainer';
import Button from './Button';
import ConfirmDialog from '../components/ConfirmDialog';
import { useConfirmDialog } from '../hooks/useConfirmDialog';

// Icons
import { Edit2, Trash2, Save, X, Users } from 'lucide-react';

// Types
import type { PersonMet } from '../types/types';

// Screen Component
const PeopleScreen = () => {
    const userProgress = useUserProgress();
    const setUserProgress = useSetUserProgressStore();
    const { dialogProps, confirm } = useConfirmDialog();
    
    const people: PersonMet[] = userProgress.peopleMet || [];
    
    const [name, setName] = useState('');
    const [notes, setNotes] = useState('');
    const [somethingInteresting, setSomethingInteresting] = useState('');
    const [activeTab, setActiveTab] = useState<'add' | 'list'>('list');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editNotes, setEditNotes] = useState('');
    const [editInteresting, setEditInteresting] = useState('');

    const addPerson = () => {
        if (name.trim() === '') return;

        const newPerson: PersonMet = {
            id: Date.now().toString(),
            name: name.trim(),
            meetDate: new Date().toLocaleDateString(),
            notes: notes.trim() || undefined,
            somethingInteresting: somethingInteresting.trim() || undefined,
        };

        setUserProgress({ peopleMet: [newPerson, ...people] });
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
            setUserProgress({ peopleMet: people.filter(person => person.id !== id) });
        }
    };

    const startEditing = (person: PersonMet) => {
        setEditingId(person.id);
        setEditNotes(person.notes || '');
        setEditInteresting(person.somethingInteresting || '');
    };

    const saveEdit = (id: string) => {
        setUserProgress({
            peopleMet: people.map(person => 
                person.id === id 
                    ? { ...person, notes: editNotes.trim() || undefined, somethingInteresting: editInteresting.trim() || undefined }
                    : person
            )
        });
        setEditingId(null);
        setEditNotes('');
        setEditInteresting('');
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditNotes('');
        setEditInteresting('');
    };

    const renderPersonItem = ({ item }: { item: PersonMet }) => {
        const isEditing = editingId === item.id;

        return (
            <div className="border-2 rounded-xl p-4 mb-4 shadow-sm hover:shadow-md transition-all border-amber-200 bg-gradient-to-br from-white to-amber-50 dark:border-gray-700 dark:from-gray-800 dark:to-gray-750">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-amber-900 dark:text-amber-200">{item.name}</h3>
                        <p className="text-xs mt-1 text-amber-600 dark:text-amber-400">📅 Met on: {item.meetDate}</p>
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
                                    onClick={() => removePerson(item.id, item.name)}
                                    className="p-2 rounded-lg transition-colors text-red-500 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
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
                    <div className="space-y-3 mt-3 pt-3 border-t border-amber-200 dark:border-gray-600">
                        <div>
                            <label className="block text-xs font-medium mb-1 text-amber-800 dark:text-amber-300">Notes:</label>
                            <textarea
                                value={editNotes}
                                onChange={(e) => setEditNotes(e.target.value)}
                                placeholder="Add notes..."
                                className="w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 resize-none border-amber-200 focus:ring-amber-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-amber-500 dark:placeholder-gray-500"
                                rows={2}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium mb-1 text-amber-800 dark:text-amber-300">Something Interesting:</label>
                            <textarea
                                value={editInteresting}
                                onChange={(e) => setEditInteresting(e.target.value)}
                                placeholder="Something interesting about them..."
                                className="w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 resize-none border-amber-200 focus:ring-amber-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-amber-500 dark:placeholder-gray-500"
                                rows={2}
                            />
                        </div>
                        <div className="flex gap-2 justify-end">
                            <button
                                onClick={cancelEdit}
                                className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
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
                            <div className="rounded-lg p-3 border bg-amber-50 border-amber-200 dark:bg-gray-700/50 dark:border-gray-600">
                                <p className="text-xs font-medium mb-1 text-amber-700 dark:text-amber-400">📝 Notes:</p>
                                <p className="text-sm text-amber-900 dark:text-gray-200">{item.notes}</p>
                            </div>
                        )}
                        {item.somethingInteresting && (
                            <div className="rounded-lg p-3 border bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
                                <p className="text-xs font-medium mb-1 text-blue-700 dark:text-blue-400">✨ Something Interesting:</p>
                                <p className="text-sm italic text-blue-900 dark:text-blue-300">"{item.somethingInteresting}"</p>
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
                            : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                >
                    People Met
                </button>
                <button
                    onClick={() => setActiveTab('add')}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                        activeTab === 'add' 
                            ? 'bg-gradient-to-r from-orange-400 to-amber-400 text-white' 
                            : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                >
                    Add Person
                </button>
            </div>
            <div className="mb-6"></div>
            {activeTab === 'add' && (
                <>
                    <div className="mb-6 space-y-4 p-6 rounded-2xl border-2 shadow-sm bg-white border-amber-100 dark:bg-gray-800 dark:border-gray-700">
                        <h2 className="text-xl font-semibold mb-4 text-amber-900 dark:text-amber-200">Add a New Person</h2>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 border-amber-200 focus:ring-amber-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-amber-500 dark:placeholder-gray-500"
                        />
                        <input
                            type="text"
                            placeholder="Notes (optional)"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 border-amber-200 focus:ring-amber-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-amber-500 dark:placeholder-gray-500"
                        />
                        <input
                            type="text"
                            placeholder="Something Interesting (optional)"
                            value={somethingInteresting}
                            onChange={(e) => setSomethingInteresting(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 border-amber-200 focus:ring-amber-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-amber-500 dark:placeholder-gray-500"
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
                            <div className="rounded-2xl p-8 text-center border-2 border-dashed border-amber-200 bg-amber-50/50 dark:border-gray-600 dark:bg-gray-800/50">
                                <div className="flex justify-center mb-4">
                                    <div className="w-16 h-16 rounded-full flex items-center justify-center bg-amber-100 dark:bg-gray-700">
                                        <Users size={28} className="text-amber-500 dark:text-amber-400" />
                                    </div>
                                </div>
                                <h3 className="font-semibold mb-2 text-amber-900 dark:text-gray-200">
                                    No people added yet
                                </h3>
                                <p className="text-sm mb-4 text-amber-700 dark:text-gray-400">
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
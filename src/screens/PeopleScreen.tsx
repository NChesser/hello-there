import { useState, useEffect } from 'react';

// Store
import { useUserProgress, useSetUserProgressStore } from '../store/store';

// Components
import ScreenContainer from '../components/ScreenContainer';
import Button from './Button';

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
    const userProgress = useUserProgress();
    const setUserProgress = useSetUserProgressStore();
    
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
    const [activeTab, setActiveTab] = useState<'add' | 'list'>('add');
    
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
    };

    const removePerson = (id: string) => {
        setPeople(people.filter(person => person.id !== id));
    };

    const renderPersonItem = ({ item }: { item: Person }) => (
        <div className="border border-amber-200 rounded-lg p-4 mb-4 bg-amber-50">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-semibold text-amber-800">{item.name}</h3>
                    <p className="text-sm text-amber-600 mb-2">Met on: {item.date}</p>
                    {item.notes && <p className="text-sm text-amber-700 mb-2">{item.notes}</p>}
                    {item.somethingInteresting && (
                        <p className="text-sm text-amber-700 italic">"{item.somethingInteresting}"</p>
                    )}
                </div>
                <button
                    onClick={() => removePerson(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                    Remove
                </button>
            </div>
        </div>
    );

    return (
        <ScreenContainer>
            <div className="flex space-x-4 mb-4">
                <button
                    onClick={() => setActiveTab('add')}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium ${activeTab === 'add' ? 'bg-gradient-to-r from-orange-400 to-amber-400 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    Add Person
                </button>
                <button
                    onClick={() => setActiveTab('list')}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium ${activeTab === 'list' ? 'bg-gradient-to-r from-orange-400 to-amber-400 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    List People
                </button>
            </div>
            <div className="mb-6"></div>
            {activeTab === 'add' && (
                <>
                    <div className="mb-6 space-y-4 bg-white p-6 rounded-2xl border-2 border-amber-100 shadow-sm">
                        <h2 className="text-xl font-semibold text-amber-900 mb-4">Add a New Person</h2>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
                        />
                        <input
                            type="text"
                            placeholder="Notes (optional)"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="w-full p-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
                        />
                        <input
                            type="text"
                            placeholder="Something Interesting (optional)"
                            value={somethingInteresting}
                            onChange={(e) => setSomethingInteresting(e.target.value)}
                            className="w-full p-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
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
                            <p className="text-amber-600">No people added yet. Start by adding someone!</p>
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
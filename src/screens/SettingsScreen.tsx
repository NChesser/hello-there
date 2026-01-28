
import React from 'react';

const SettingsScreen = () => {
    return (
        <div className="p-6 pb-24 h-full overflow-y-auto space-y-6">
            <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-amber-100">
                    <h2 className="text-xl font-semibold text-amber-900 mb-4">Settings</h2>

                    <div className="space-y-4">
                        <div className="pb-4 border-b border-amber-100">
                            <h3 className="text-sm font-medium text-amber-800 mb-2">About This App</h3>
                            <p className="text-sm text-amber-600 leading-relaxed">
                                This app helps build social confidence gently, one tiny step at a time.
                                There are no streaks, no failures, just small moments of bravery.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-amber-800 mb-2">Need Support?</h3>
                            <p className="text-sm text-amber-600 leading-relaxed mb-3">
                                If you're feeling overwhelmed, that's okay. Take a deep breath.
                                You're doing great just by being here.
                            </p>
                            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                <p className="text-sm text-blue-800">
                                    💙 Remember: Progress isn't linear. Rest is part of the journey.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SettingsScreen;
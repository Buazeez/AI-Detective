import React, { useState } from 'react';
import { Search, Globe, Users, Award } from 'lucide-react';
import { Player } from '../types';

interface RegistrationScreenProps {
  onRegistration: (player: Player) => void;
}

const countries = [
  'Australia', 'United States', 'United Kingdom', 'Canada', 'Germany', 'France', 'Japan', 'South Korea',
  'India', 'China', 'Brazil', 'Mexico', 'Spain', 'Italy', 'Netherlands', 'Sweden', 'Norway', 'Denmark',
  'New Zealand', 'Singapore', 'Other'
];

const RegistrationScreen: React.FC<RegistrationScreenProps> = ({ onRegistration }) => {
  const [formData, setFormData] = useState({
    name: '',
    school: '',
    ageRange: '11-13' as Player['ageRange'],
    country: 'Australia'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const player: Player = {
      id: `player_${Date.now()}`,
      name: formData.name.trim(),
      school: formData.school.trim() || undefined,
      ageRange: formData.ageRange,
      country: formData.country,
      totalScore: 0,
      currentLevel: 1,
      badges: [],
      createdAt: new Date(),
      lastPlayed: new Date()
    };

    onRegistration(player);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Search className="h-12 w-12 text-detective-500 mr-3" />
            <h1 className="text-4xl font-bold text-white">AI Detective</h1>
          </div>
          <h2 className="text-2xl font-semibold text-detective-300 mb-2">Hallucination Hunt</h2>
          <p className="text-lg text-white/80">
            Join 50,000+ students learning AI literacy globally!
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="detective-card text-center">
            <Globe className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-1">Global Competition</h3>
            <p className="text-sm text-white/70">Compete with students worldwide</p>
          </div>
          <div className="detective-card text-center">
            <Users className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-1">Real-time Leaderboard</h3>
            <p className="text-sm text-white/70">See your rank change instantly</p>
          </div>
          <div className="detective-card text-center">
            <Award className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-1">Earn Badges</h3>
            <p className="text-sm text-white/70">Unlock achievements as you learn</p>
          </div>
        </div>

        {/* Registration Form */}
        <div className="detective-card">
          <h3 className="text-xl font-bold text-white mb-6 text-center">
            🕵️ Welcome to AI Detective!
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Detective Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="detective-input w-full"
                placeholder="Enter your detective name"
                maxLength={20}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                School/Organization
              </label>
              <input
                type="text"
                value={formData.school}
                onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                className="detective-input w-full"
                placeholder="Your school or organization (optional)"
                maxLength={50}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Age Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['11-13', '14-16', '17+', 'teacher'] as const).map((age) => (
                  <button
                    key={age}
                    type="button"
                    onClick={() => setFormData({ ...formData, ageRange: age })}
                    className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                      formData.ageRange === age
                        ? 'bg-detective-500 text-white'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    {age === 'teacher' ? 'Teacher' : age}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Country
              </label>
              <select
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="detective-input w-full"
              >
                {countries.map((country) => (
                  <option key={country} value={country} className="bg-slate-800 text-white">
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="detective-button flex-1"
              >
                Register & Join Leaderboard
              </button>
              <button
                type="button"
                onClick={() => onRegistration({
                  id: `guest_${Date.now()}`,
                  name: 'Guest Detective',
                  ageRange: '11-13',
                  country: 'Unknown',
                  totalScore: 0,
                  currentLevel: 1,
                  badges: [],
                  createdAt: new Date(),
                  lastPlayed: new Date()
                })}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
              >
                Continue as Guest
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-white/60 text-sm">
          <p>Learn AI literacy • Detect hallucinations • Think critically</p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationScreen;

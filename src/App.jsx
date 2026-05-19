import React, { useState } from 'react';

export default function App() {
  // Simple form states
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [serviceType, setServiceType] = useState('Standard Flatbed Tow');
  const [vehicleDetails, setVehicleDetails] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  // Handles generating the native SMS pre-populated text message
  const handleSmsSubmit = (e) => {
    e.preventDefault();

    if (!pickup || !customerPhone) {
      alert("Please provide at least a Pickup Location and Contact Phone.");
      return;
    }

    const dispatchNumber = "9073989626";
    
    // Construct a clean, easy-to-read dispatch SMS template
    const messageText = `Arctic Wolf Dispatch Request:
------------------------
• Name: ${customerName || 'Not specified'}
• Phone: ${customerPhone}
• Service: ${serviceType}
• Pickup: ${pickup}
• Dropoff: ${dropoff || 'Not specified'}
• Vehicle: ${vehicleDetails || 'Not specified'}
• Notes: ${additionalNotes || 'None'}`;

    // Properly encode the message body for the URL scheme
    const encodedBody = encodeURIComponent(messageText);
    
    // Standard SMS URI format that works across both iOS and Android
    const smsUrl = `sms:${dispatchNumber}?body=${encodedBody}`;
    
    // Redirect to the native SMS app
    window.location.href = smsUrl;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased flex flex-col justify-between">
      
      {/* HEADER */}
      <header className="bg-slate-900 border-b border-slate-800 shadow-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <span className="text-2xl">🐺</span>
            <div>
              <span className="block font-black tracking-wider text-base text-cyan-400">
                ARCTIC WOLF
              </span>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                SERVICES LLC • SOLDOTNA, AK
              </span>
            </div>
          </div>

          {/* Quick USDOT Badge */}
          <div className="text-[10px] text-slate-500 bg-slate-950 px-2 py-1 rounded border border-slate-800">
            USDOT #3837182
          </div>
        </div>
      </header>

      {/* HERO SECTION WITH PRIMARY CALL BUTTON */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-950 py-10 px-4 text-center border-b border-slate-900">
        <div className="max-w-xl mx-auto space-y-5">
          <span className="inline-block bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            ❄️ 24/7 Kenai Peninsula Towing
          </span>
          
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            Fast, Reliable Roadside & Towing
          </h1>
          
          <p className="text-sm text-slate-300">
            Based in Soldotna. Direct dispatch flatbed towing, winch-outs, tire changes, lockouts, and jumpstarts.
          </p>

          {/* Direct Native Call Button */}
          <div className="pt-2">
            <a
              href="tel:9073989626"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold tracking-wide text-lg shadow-xl shadow-rose-950/40 transition-transform active:scale-95"
            >
              <span>📞</span>
              <span>CALL DISPATCH: (907) 398-9626</span>
            </a>
            <span className="block text-[11px] text-slate-500 mt-2">
              Tap above to immediately dial our local Soldotna phone line.
            </span>
          </div>
        </div>
      </section>

      {/* DISPATCH FORM & SERVICES PORTAL */}
      <main className="max-w-xl mx-auto px-4 py-8 w-full space-y-8">
        
        {/* FAST SMS DISPATCH FORM */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>💬</span> Quick SMS Dispatch Setup
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Fill in your details below. Submitting will pre-fill a text message on your phone ready to send straight to our dispatcher.
            </p>
          </div>

          <form onSubmit={handleSmsSubmit} className="space-y-4 text-left">
            
            {/* Service Type */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                Service Needed
              </label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
              >
                <option value="Standard Flatbed Tow">Standard Flatbed Tow</option>
                <option value="Winch-out / Off-Road Recovery">Winch-out / Snow Recovery</option>
                <option value="Tire Change Service">Flat Tire Change</option>
                <option value="Car Jumpstart">Battery Jumpstart</option>
                <option value="Lockout Service">Vehicle Lockout Service</option>
                <option value="Equipment Transport">Heavy Equipment Transport</option>
              </select>
            </div>

            {/* Pickup Location */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                Pickup Location <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Mile 92 Sterling Hwy, Soldotna"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            {/* Dropoff Destination */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                Dropoff Destination (If Towing)
              </label>
              <input
                type="text"
                placeholder="e.g. Chevron Station or Home in Kenai"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            {/* Vehicle Year Make Model */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                Vehicle Details
              </label>
              <input
                type="text"
                placeholder="e.g. 2018 Ford F-150, Red"
                value={vehicleDetails}
                onChange={(e) => setVehicleDetails(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="John D."
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                  Contact Phone Number <span className="text-rose-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="(907) 555-0199"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>
            </div>

            {/* Extra Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                Special Instructions / Notes
              </label>
              <textarea
                placeholder="e.g. Stuck deep in ditch, need winch extension, keys are with vehicle..."
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                rows="2"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 resize-none"
              />
            </div>

            {/* Submit SMS Dispatch Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-extrabold tracking-wider uppercase text-xs shadow-lg transition-transform active:scale-98 flex items-center justify-center gap-2"
            >
              <span>📨</span> Send Dispatch SMS Details
            </button>

          </form>
        </div>

        {/* COMPACT CLEAN SERVICES LIST */}
        <div className="grid grid-cols-2 gap-4 text-left">
          <div className="bg-slate-900 border border-slate-800/80 p-4 rounded-xl">
            <span className="text-lg">🛻</span>
            <h4 className="font-bold text-xs text-white mt-2">Flatbed Car Towing</h4>
            <p className="text-[11px] text-slate-400 mt-1">Wheel-lift & flatbed carriers for light & medium vehicles.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800/80 p-4 rounded-xl">
            <span className="text-lg">⛓️</span>
            <h4 className="font-bold text-xs text-white mt-2">Winch & Off-Road</h4>
            <p className="text-[11px] text-slate-400 mt-1">Snow recovery, ditch extractions, mud pull-outs.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800/80 p-4 rounded-xl">
            <span className="text-lg">🔌</span>
            <h4 className="font-bold text-xs text-white mt-2">Roadside Services</h4>
            <p className="text-[11px] text-slate-400 mt-1">Rapid jumpstarts, lockouts, fuel drops, tire changes.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800/80 p-4 rounded-xl">
            <span className="text-lg">🏗️</span>
            <h4 className="font-bold text-xs text-white mt-2">Equipment Hauling</h4>
            <p className="text-[11px] text-slate-400 mt-1">Industrial machinery, commercial transport.</p>
          </div>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8 text-center text-xs text-slate-400 mt-auto">
        <div className="max-w-md mx-auto px-4 space-y-4">
          <div>
            <strong className="block text-slate-300">Arctic Wolf Services LLC</strong>
            <span className="text-[11px] text-slate-500">34972 Paddle Cir, Soldotna, AK 99669</span>
          </div>

          <div className="flex justify-center space-x-6">
            <a href="tel:9073989626" className="text-cyan-400 hover:underline font-bold">Call: (907) 398-9626</a>
            <span className="text-slate-700">|</span>
            <a href="mailto:arcticwolfservicesllc@gmail.com" className="text-cyan-400 hover:underline">arcticwolfservicesllc@gmail.com</a>
          </div>

          <p className="text-[10px] text-slate-600">
            © {new Date().getFullYear()} Arctic Wolf Services LLC. All rights reserved.<br />
            USDOT #3837182 Intrastate Carrier Registration.
          </p>
        </div>
      </footer>

    </div>
  );
}

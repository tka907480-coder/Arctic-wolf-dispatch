import React, { useState, useCallback } from 'react';

export default function App() {
  // Form states
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [serviceType, setServiceType] = useState('Standard Flatbed Tow');
  const [vehicleDetails, setVehicleDetails] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null | 'success' | 'error'

  const dispatchNumber = "9073989626";

  // Handle SMS dispatch
  const handleSmsSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!pickup.trim() || !customerPhone.trim()) {
      alert("Please provide at least a Pickup Location and Contact Phone.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const messageText = `Arctic Wolf Dispatch Request:
------------------------
• Name: ${customerName.trim() || 'Not specified'}
• Phone: ${customerPhone.trim()}
• Service: ${serviceType}
• Pickup: ${pickup.trim()}
• Dropoff: ${dropoff.trim() || 'Not specified'}
• Vehicle: ${vehicleDetails.trim() || 'Not specified'}
• Notes: ${additionalNotes.trim() || 'None'}`;

      const encodedBody = encodeURIComponent(messageText);
      const smsUrl = `sms:\( {dispatchNumber}?body= \){encodedBody}`;

      // Open native SMS app
      window.location.href = smsUrl;

      // Optimistic UI feedback
      setSubmitStatus('success');
      
      // Reset form after a short delay (gives time for SMS app to open)
      setTimeout(() => {
        setPickup('');
        setDropoff('');
        setVehicleDetails('');
        setCustomerName('');
        setCustomerPhone('');
        setAdditionalNotes('');
        setSubmitStatus(null);
      }, 1500);

    } catch (error) {
      console.error('SMS dispatch error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }, [pickup, dropoff, serviceType, vehicleDetails, customerName, customerPhone, additionalNotes]);

  // Copy message to clipboard (great desktop fallback)
  const copyDispatchMessage = useCallback(() => {
    if (!pickup.trim() || !customerPhone.trim()) {
      alert("Please fill Pickup Location and Phone before copying.");
      return;
    }

    const messageText = `Arctic Wolf Dispatch Request:
------------------------
• Name: ${customerName.trim() || 'Not specified'}
• Phone: ${customerPhone.trim()}
• Service: ${serviceType}
• Pickup: ${pickup.trim()}
• Dropoff: ${dropoff.trim() || 'Not specified'}
• Vehicle: ${vehicleDetails.trim() || 'Not specified'}
• Notes: ${additionalNotes.trim() || 'None'}`;

    navigator.clipboard.writeText(messageText).then(() => {
      alert("✅ Dispatch details copied to clipboard!\n\nPaste into your messaging app and send to (907) 398-9626");
    }).catch(() => {
      alert("Failed to copy. Please try again.");
    });
  }, [pickup, dropoff, serviceType, vehicleDetails, customerName, customerPhone, additionalNotes]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased flex flex-col justify-between">
      {/* HEADER */}
      <header className="bg-slate-900 border-b border-slate-800 shadow-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <span className="text-3xl">🐺</span>
            <div>
              <span className="block font-black tracking-wider text-xl text-cyan-400">
                ARCTIC WOLF
              </span>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                SERVICES LLC • SOLDOTNA, AK
              </span>
            </div>
          </div>

          <div className="text-[10px] text-slate-500 bg-slate-950 px-3 py-1.5 rounded border border-slate-700">
            USDOT #3837182
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-950 py-12 px-4 text-center border-b border-slate-900">
        <div className="max-w-xl mx-auto space-y-6">
          <span className="inline-block bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
            ❄️ 24/7 KENAI PENINSULA TOWING &amp; ROADSIDE
          </span>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-white leading-none">
            Fast. Reliable.<br />Local Towing.
          </h1>

          <p className="text-slate-300 max-w-md mx-auto">
            Soldotna-based flatbed towing, winch-outs, tire changes, lockouts, jumpstarts &amp; equipment transport.
          </p>

          <div className="pt-4">
            <a
              href="tel:9073989626"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white font-extrabold tracking-wider text-xl shadow-2xl shadow-rose-950/50 transition-all active:scale-[0.97]"
            >
              <span className="text-2xl group-active:rotate-12 transition-transform">📞</span>
              <span>CALL DISPATCH NOW<br /><span className="text-base font-normal opacity-90">(907) 398-9626</span></span>
            </a>
            <p className="text-[11px] text-slate-500 mt-3">Instant connection to our local dispatcher</p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="max-w-xl mx-auto px-4 py-10 w-full space-y-10">
        {/* SMS DISPATCH FORM */}
        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span>💬</span> Quick SMS Dispatch
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Fill the form → tap button → ready-to-send text opens on your phone.
              </p>
            </div>
            <button
              onClick={copyDispatchMessage}
              className="text-xs px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl flex items-center gap-2 transition-colors"
              type="button"
            >
              📋 Copy Message
            </button>
          </div>

          <form onSubmit={handleSmsSubmit} className="space-y-6">
            {/* Service Type */}
            <div>
              <label htmlFor="serviceType" className="block text-xs font-bold text-slate-300 uppercase mb-2">
                Service Needed
              </label>
              <select
                id="serviceType"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-5 py-4 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              >
                <option value="Standard Flatbed Tow">Standard Flatbed Tow</option>
                <option value="Winch-out / Off-Road Recovery">Winch-out / Snow Recovery</option>
                <option value="Tire Change Service">Flat Tire Change</option>
                <option value="Car Jumpstart">Battery Jumpstart</option>
                <option value="Lockout Service">Vehicle Lockout Service</option>
                <option value="Equipment Transport">Heavy Equipment Transport</option>
              </select>
            </div>

            {/* Pickup */}
            <div>
              <label htmlFor="pickup" className="block text-xs font-bold text-slate-300 uppercase mb-2">
                Pickup Location <span className="text-rose-500">*</span>
              </label>
              <input
                id="pickup"
                type="text"
                required
                placeholder="Mile 92 Sterling Hwy, Soldotna or exact address"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-5 py-4 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Dropoff */}
            <div>
              <label htmlFor="dropoff" className="block text-xs font-bold text-slate-300 uppercase mb-2">
                Dropoff Destination (optional)
              </label>
              <input
                id="dropoff"
                type="text"
                placeholder="Home in Kenai, Chevron, repair shop, etc."
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-5 py-4 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Vehicle */}
            <div>
              <label htmlFor="vehicle" className="block text-xs font-bold text-slate-300 uppercase mb-2">
                Vehicle Details
              </label>
              <input
                id="vehicle"
                type="text"
                placeholder="2018 Ford F-150 SuperCrew, Red, 4WD"
                value={vehicleDetails}
                onChange={(e) => setVehicleDetails(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-5 py-4 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-xs font-bold text-slate-300 uppercase mb-2">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-5 py-4 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-xs font-bold text-slate-300 uppercase mb-2">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  placeholder="(907) 555-1234"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-5 py-4 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-xs font-bold text-slate-300 uppercase mb-2">
                Special Instructions / Notes
              </label>
              <textarea
                id="notes"
                placeholder="Vehicle is in a deep ditch, needs winch extension, keys inside, etc."
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                rows={3}
                className="w-full bg-slate-950 border border-slate-700 rounded-3xl px-5 py-4 text-slate-100 resize-y min-h-[100px] placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col gap-3 pt-4">
              <button
                type="submit"
                disabled={isSubmitting || !pickup.trim() || !customerPhone.trim()}
                className="w-full py-5 rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 hover:brightness-110 active:scale-[0.985] font-extrabold tracking-widest uppercase text-sm shadow-xl shadow-cyan-950/50 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>⏳ Preparing SMS...</>
                ) : (
                  <>
                    <span className="text-xl">📨</span>
                    OPEN SMS TO DISPATCH
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <p className="text-center text-emerald-400 text-sm font-medium">
                  ✅ SMS app should be open — send it!
                </p>
              )}
            </div>
          </form>
        </div>

        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: "🛻", title: "Flatbed Towing", desc: "Safe transport for cars, trucks & light equipment" },
            { icon: "⛓️", title: "Winch Recovery", desc: "Snow, mud, ditches & off-road extractions" },
            { icon: "🔧", title: "Roadside Assistance", desc: "Jumpstarts, lockouts, tire changes, fuel delivery" },
            { icon: "🏗️", title: "Equipment Hauling", desc: "Heavy machinery & commercial transport" },
          ].map((service, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-800 transition-colors">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h4 className="font-bold text-lg text-white">{service.title}</h4>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 border-t border-slate-800 py-10 text-center text-xs text-slate-400 mt-auto">
        <div className="max-w-md mx-auto px-4 space-y-5">
          <div>
            <strong className="text-slate-200">Arctic Wolf Services LLC</strong><br />
            34972 Paddle Cir, Soldotna, AK 99669
          </div>

          <div className="flex justify-center items-center gap-6 text-sm">
            <a href="tel:9073989626" className="text-cyan-400 hover:text-cyan-300 font-semibold">☎️ (907) 398-9626</a>
            <span className="text-slate-700">•</span>
            <a href="mailto:arcticwolfservicesllc@gmail.com" className="text-cyan-400 hover:text-cyan-300">Email Us</a>
          </div>

          <p className="text-[10px] text-slate-600">
            © {new Date().getFullYear()} Arctic Wolf Services LLC • USDOT #3837182<br />
            Intrastate Carrier • Kenai Peninsula, Alaska
          </p>
        </div>
      </footer>
    </div>
  );
}
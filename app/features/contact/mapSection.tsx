import React from "react";

function MapSection() {
    return (
        <section className="bg-white py-10 sm:py-20 md:px-0 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="w-full h-[350px] sm:h-[450px] md:h-[600px] rounded-2xl overflow-hidden shadow-sm">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2397.8!2d-1.4108!3d53.1637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48798e29e3f1c5d1%3A0x3db8abf8e2f5c4a!2sTechnique%20Learning%20Solutions!5e0!3m2!1sen!2suk!4v1709000000000!5m2!1sen!2suk"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Technique Learning Solutions Location"
                        className="w-full h-full"
                    />
                </div>
            </div>
        </section>
    );
}

export default MapSection;

import React from "react";

function MapSection() {
    return (
        <section className="bg-white py-10 sm:py-20 md:px-0 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="w-full h-[350px] sm:h-[450px] md:h-[600px] rounded-2xl overflow-hidden shadow-sm">
                    <iframe
                        src="https://www.google.com/maps/d/u/0/embed?mid=1nU1ecA3H6TsQO1OTKn53eeOG6iqgvIAS"
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

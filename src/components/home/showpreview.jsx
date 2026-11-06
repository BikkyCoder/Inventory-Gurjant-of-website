const items = [
  "Buttons",
  "Cards",
  "Headers",
  "Forms",
  "Modals",
  "Dashboard",
  "3D UI",
  "Animated UI",
  "Glass UI",
];

const Grid9Section = () => {
  return (
    <section className="py-20 bg-black text-white px-6">
      <div className="max-w-6xl mx-auto">
        
        <h2 className="text-3xl font-bold text-center mb-12">
          UI Inventory Collection
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="h-40 rounded-2xl bg-gray-900 flex items-center justify-center text-lg font-semibold
                         hover:bg-gray-800 hover:scale-105 transition cursor-pointer"
            >
              {item}
            </div>
          ))}
        </div>

      </div>    
    </section>
  );
};

export default Grid9Section;

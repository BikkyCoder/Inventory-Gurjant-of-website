const branches = [
  "Buttons",
  "Cards",
  "Headers",
  "Forms",
  "Modals",
  "Dashboard",
  "3D UI",
  "Animated UI",
];

const TreeSection = () => {
  return (
    <section className="py-24 bg-black text-white px-6">
      <h2 className="text-3xl font-bold text-center mb-20">
        UI Inventory Structure
      </h2>

      <div className="relative max-w-5xl mx-auto">

        {/* Center Line (Tree Trunk) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gray-700 -translate-x-1/2" />

        {/* Branches */}
        <div className="flex flex-col gap-12">
          {branches.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                className={`relative flex items-center ${
                  isLeft ? "justify-start pr-1/2" : "justify-end pl-1/2"
                }`}
              >
                {/* Horizontal Branch Line */}
                <div
                  className={`absolute top-1/2 h-[2px] bg-gray-700 ${
                    isLeft
                      ? "right-1/2 w-24"
                      : "left-1/2 w-24"
                  }`}
                />

                {/* Branch Box */}
                <div
                  className={`w-56 p-4 rounded-xl bg-gray-900 border border-gray-800
                              hover:scale-105 transition text-center ${
                    isLeft ? "mr-auto" : "ml-auto"
                  }`}
                >
                  {item}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default TreeSection;

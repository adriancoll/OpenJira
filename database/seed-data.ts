interface SeedData {
    entries: SeedEntry[]
}

interface SeedEntry {
    description: string
    status: string
    createdAt: number
}

export const seedData: SeedData = {
  entries: [
    {
      description:
        "1- Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo enim illum maxime eaque error laboriosam, doloremque deserunt totam facere odit quisquam accusamus assumenda atque ex modi minus vel, rerum repudiandae!",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description:
        "2- Loexport * from rem ipsum dolor sit amet consectetur adipisicing elit. Explicabo enim illum maxime eaque error laboriosam, doloremque deserunt totam facere odit quisquam accusamus assumenda atque ex modi minus vel, rerum repudiandae!",
      status: "in-progress",
      createdAt: Date.now() - 100000,
    },
    {
      description:
        "3- Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo enim illum maxime eaque error laboriosam, doloremque deserunt totam facere odit quisquam accusamus assumenda atque ex modi minus vel, rerum repudiandae!",
      status: "finished",
      createdAt: Date.now() - 1000000,
    },
  ],
};

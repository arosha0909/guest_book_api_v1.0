import seedUser from "./user.seed";

export default async function seed() {
    const user = await seedUser();
}
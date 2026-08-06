import { db } from './src/index';
import { activitiesTable, activityPackagesTable } from './src/schema/index.js';
import { activities as mockActivities } from '../../artifacts/rayna-tours/src/data/mockData';
import crypto from 'crypto';
import { eq } from 'drizzle-orm';

async function seed() {
  console.log('Seeding activities...');
  for (const act of mockActivities) {
    // check if it exists
    const existing = await db.select().from(activitiesTable).where(eq(activitiesTable.name, act.title));
    let actId;
    if (existing.length === 0) {
      const newAct = await db.insert(activitiesTable).values({
        id: crypto.randomUUID(),
        slug: act.slug,
        name: act.title,
        category: act.category,
        description: act.description,
        coverImageUrl: act.imageUrl,
        isActive: true,
      }).returning({ id: activitiesTable.id });
      actId = newAct[0].id;
    } else {
      actId = existing[0].id;
    }

    // Insert packages
    if (act.options) {
      for (const opt of act.options) {
        await db.insert(activityPackagesTable).values({
          id: crypto.randomUUID(),
          activityId: actId,
          name: opt.name,
          description: opt.description || '',
          price: opt.priceAed,
          currency: 'AED'
        });
      }
    } else {
      // Default package
      await db.insert(activityPackagesTable).values({
        id: crypto.randomUUID(),
        activityId: actId,
        name: 'Standard Package',
        description: act.shortDescription || '',
        price: act.priceAed,
        currency: 'AED'
      });
    }
  }
  console.log('Done seeding.');
  process.exit(0);
}

seed().catch(console.error);

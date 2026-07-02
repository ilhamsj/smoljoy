import { getPayload } from 'payload'

import config from '@/payload.config'
import { Hero } from '@/components/home/Hero'
import { ScrollRow } from '@/components/home/ScrollRow'
import { PetCard } from '@/components/home/PetCard'
import { BreederCard } from '@/components/home/BreederCard'
import { BreedsSection } from '@/components/home/BreedsSection'
import { EthicsSection } from '@/components/home/EthicsSection'
import { WhyFoundedSection } from '@/components/home/WhyFoundedSection'
import { ValuesSection } from '@/components/home/ValuesSection'
import { BreederCtaSection } from '@/components/home/BreederCtaSection'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const [{ docs: pets }, { docs: breeders }, { docs: breeds }] = await Promise.all([
    payload.find({
      collection: 'pets',
      sort: '-createdAt',
      depth: 2,
      limit: 10,
    }),
    payload.find({
      collection: 'breeders',
      where: { status: { equals: 'active' } },
      sort: '-createdAt',
      depth: 1,
      limit: 10,
    }),
    payload.find({
      collection: 'breeds',
      sort: 'name',
      limit: 100,
    }),
  ])

  return (
    <div className="home">
      <Hero />

      {pets.length > 0 && (
        <ScrollRow
          title="Pet Terbaru"
          subtitle="10 pet yang baru saja bergabung di Smoljoy"
          viewAllHref="/pets"
        >
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </ScrollRow>
      )}

      {breeders.length > 0 && (
        <ScrollRow
          title="Breeder Terbaru"
          subtitle="Breeder yang baru saja bergabung dan terverifikasi"
          viewAllHref="/breeders"
        >
          {breeders.map((breeder) => (
            <BreederCard key={breeder.id} breeder={breeder} />
          ))}
        </ScrollRow>
      )}

      <BreedsSection breeds={breeds} />
      <EthicsSection />
      <WhyFoundedSection />
      <ValuesSection />
      <BreederCtaSection />
    </div>
  )
}

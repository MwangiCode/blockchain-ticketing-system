import { prisma } from '@/lib/prisma';
import EventDetails from '@/components/EventDetails';

interface EventPageProps {
  params: {
    id: string;
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await prisma.event.findUnique({
    where: { id: params.id }
  });

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">Event not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <EventDetails event={event} />
    </div>
  );
}
import "./page.css";
import Calendar from "@/app/components/Calendar/Calendar";

export async function generateMetadata({ params }: any) {
  return {
    title: "service name",
  };
}

export default async function CalendarPage({ params }: any) {
  const service = {id: "1", name: "Service Name", duration: "1 hr"};

  return (
    <div className="bg-white max-w-full-content mx-auto">
      {service ? (
        <>
          <section className="align-middle box-border p-6 pt-16 text-left max-w-7xl mx-auto max-sm:px-2">
            <h1 className="mb-4 text-3xl text-center font-serif font-bold leading-[34.09px]">
              {service.name || "Service Name"}
            </h1>
            <p className="text-center font-roboto font-normal text-[18px] leading-[26.1px]">
              This is the space to introduce the Services section. Briefly
              describe the types of services offered
            </p>
          </section>

          <div
            key={service.id}
            className="full-w rounded overflow-hidden max-w-7xl mx-auto"
          >
            <Calendar service={service} />
          </div>
        </>
      ) : (
        <div className="text-3xl w-full text-center p-9 box-border">
          The service was not found
        </div>
      )}
    </div>
  );
}

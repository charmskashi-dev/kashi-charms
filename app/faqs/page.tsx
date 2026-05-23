import Container from "@/components/Container";

const FAQsPage = () => {
  return (
    <Container className="py-16 max-w-4xl">
      <div className="space-y-10">

        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-darkColor">
            Frequently Asked Questions
          </h1>

          <p className="text-lightColor text-lg leading-8">
            Answers to the most common questions about Kashi Charms ✨
          </p>
        </div>

        <div className="space-y-8">

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-darkColor">
              Are your products handmade?
            </h2>

            <p className="text-lightColor leading-8">
              Yes — every piece at Kashi Charms is carefully handmade.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-darkColor">
              How long does shipping take?
            </h2>

            <p className="text-lightColor leading-8">
              Orders are usually processed within 2–4 business days,
              and delivery timelines vary based on location.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-darkColor">
              Do you accept returns?
            </h2>

            <p className="text-lightColor leading-8">
              Returns are accepted only for damaged,
              defective, or incorrect products.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-darkColor">
              Can I track my order?
            </h2>

            <p className="text-lightColor leading-8">
              Yes — once your order is placed,
              you can track it from the Orders page.
            </p>
          </section>

        </div>
      </div>
    </Container>
  );
};

export default FAQsPage;
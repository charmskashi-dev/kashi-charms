import Container from "@/components/Container";

const ContactPage = () => {
  return (
    <Container className="py-16 max-w-4xl">
      <div className="space-y-10">

        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-darkColor">
            Contact Us
          </h1>

          <p className="text-lightColor text-lg leading-8">
            We'd love to hear from you ✨
            Whether you have a question about your order,
            collaborations, or custom requests —
            we're always here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-[#faf7f2] border rounded-3xl p-6 space-y-3">
            <h2 className="text-2xl font-semibold text-darkColor">
              Email Support
            </h2>

            <p className="text-lightColor leading-8">
              Reach out to us anytime and we'll get back to you
              as soon as possible.
            </p>

            <p className="font-medium text-darkColor">
              kashicharmsofficial@gmail.com
            </p>
          </div>

          <div className="bg-[#faf7f2] border rounded-3xl p-6 space-y-3">
            <h2 className="text-2xl font-semibold text-darkColor">
              Social Media
            </h2>

            <p className="text-lightColor leading-8">
              Follow Kashi Charms for new launches,
              styling inspiration, and behind-the-scenes content.
            </p>

            <p className="font-medium text-darkColor">
              Instagram: @kashicharms
            </p>
          </div>

        </div>
      </div>
    </Container>
  );
};

export default ContactPage;
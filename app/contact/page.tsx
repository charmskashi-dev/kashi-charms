import Container from "@/components/Container";

const ContactPage = () => {
  return (
    <Container className="py-16 max-w-4xl">
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-darkColor">
          Contact Us
        </h1>

        <div className="space-y-4 text-lightColor">
          <p>Email: kashicharmsofficial@gmail.com</p>

          <p>Phone: +91 9005369833</p>

          <p>Working Hours: Mon - Sat, 10 AM - 7 PM</p>
        </div>
      </div>
    </Container>
  );
};

export default ContactPage;
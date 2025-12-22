export const dynamic = "force-dynamic";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Local Guide – Policy",
}

const PolicyPage = () => {
  return (
    <section className="py-20 bg-linear-to-r from-primary/5 via-secondary/5 to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <div className="inline-block bg-highlight/30 text-accent px-4 py-1.5 rounded-full text-sm font-medium">
            Policies
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Platform Policies
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            These policies explain how our platform operates and what is
            expected from all users.
          </p>
        </div>

        {/* Policy Content */}
        <div className="bg-card border border-border rounded-2xl p-8 md:p-10 space-y-10">
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold text-foreground">
              User Accounts & Authentication
            </h3>
            <p className="text-muted-foreground text-base leading-relaxed">
              Users must provide accurate and up-to-date information during
              registration. Secure authentication mechanisms are used to
              protect accounts and manage sessions safely.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl font-semibold text-foreground">
              Tours & Bookings
            </h3>
            <p className="text-muted-foreground text-base leading-relaxed">
              Guides are responsible for keeping tour information accurate and
              current. Bookings may be managed or canceled according to
              role-based permissions and applicable rules.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl font-semibold text-foreground">
              Payments
            </h3>
            <p className="text-muted-foreground text-base leading-relaxed">
              Payments are processed through trusted third-party providers. The
              platform does not store sensitive payment details such as card
              numbers or security codes.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl font-semibold text-foreground">
              Reviews & User Conduct
            </h3>
            <p className="text-muted-foreground text-base leading-relaxed">
              Reviews must be fair, honest, and respectful. Any content that is
              misleading, abusive, or inappropriate may be moderated or
              removed to maintain community standards.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl font-semibold text-foreground">
              Data & Privacy
            </h3>
            <p className="text-muted-foreground text-base leading-relaxed">
              User data is handled responsibly and used only to improve platform
              functionality, security, and overall user experience in
              accordance with privacy regulations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PolicyPage

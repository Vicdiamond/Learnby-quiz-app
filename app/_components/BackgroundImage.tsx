import Image from "next/image";

function BackgroundImage() {
  return (
    <div>
      {/* Mobile light and dark mode background */}
      <div className="sm:hidden">
        <Image
          src="/assets/images/pattern-background-mobile-light.svg"
          alt="Light Logo"
          className="block dark:hidden  -z-40 object-cover"
          fill
        />
        <Image
          src="/assets/images/pattern-background-mobile-dark.svg"
          alt="Dark Logo"
          className="hidden dark:block -z-30 object-cover"
          fill
        />
      </div>

      {/* Tablet light and dark mode background */}
      <div className="sm:block hidden lg:hidden">
        <Image
          src="/assets/images/pattern-background-tablet-light.svg"
          alt="Light Logo"
          className="block dark:hidden  -z-40  object-cover"
          fill
        />
        <Image
          src="/assets/images/pattern-background-tablet-dark.svg"
          alt="Dark Logo"
          className="hidden dark:block -z-30  object-cover"
          fill
        />
      </div>

      {/* Desktop light and dark mode background */}
      <div className="hidden lg:block">
        <Image
          src="/assets/images/pattern-background-desktop-light.svg"
          alt="Light Logo"
          className="block dark:hidden  -z-40 object-cover"
          fill
        />
        <Image
          src="/assets/images/pattern-background-desktop-dark.svg"
          alt="Dark Logo"
          className="hidden dark:block -z-30 object-cover"
          fill
        />
      </div>
    </div>
  );
}

export default BackgroundImage;

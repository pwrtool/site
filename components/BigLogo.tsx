import Image from "next/image";

export default function BigLogo() {
  return (
    <div className="p-12 my-12 mx-auto text-center w-[25rem]">
      <Image
        src="/branding/colored_icon.svg"
        alt="Powertool Logo"
        className="mx-auto"
        width={200}
        height={200}
      />
      <div className="big-logo-shadow" />
      <h1 className="text-6xl font-bold text-center pt-8">Powertool</h1>
      <h3 className="text-3xl text-center pt-8">Automate everything</h3>
    </div>
  );
}

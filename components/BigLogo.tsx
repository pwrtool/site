import Image from "next/image";

export default function BigLogo() {
  return (
    <div className="mx-auto big-logo-shadow p-12 m-12 text-center">
      <Image
        src="/branding/colored_icon.svg"
        alt="Powertool Logo"
        className="mx-auto"
        width={200}
        height={200}
      />
      <h1 className="text-6xl font-bold text-center">Powertool</h1>
    </div>
  );
}

import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "🔧 Hackable",
    description: <>Powertool kits run on bun. Any</>,
  },
  {
    title: "🌐 Runs Anywhere",
    description: (
      <>
        Powertool can run on your machine, as a docker container, as a github
        action, or just as a simple bash script.
      </>
    ),
  },
  {
    title: "⚡ Fast",
    description: (
      <>
        The CLI tool is written in bun and works near instantly. Powertool
        leaves only a negligble amount of overhead and lets your code do the
        work unimpaired
      </>
    ),
  },
];

function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

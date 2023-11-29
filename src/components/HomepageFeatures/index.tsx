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
    description: (
      <>
        Powertools start out as just a simple shell script. If that's all you
        need, that all you have to have. If you need more, typescript with bun
        can be adopted. It's also possible to just build your own system
      </>
    ),
  },
  {
    title: "🌐 Runs Anywhere",
    description: (
      <>
        Powertool is built to be able to be run anywhere. Each kit is built to
        be self installing and self contained. Powertool can be run as a github
        action, docker container, or just through a CLI on your machine.
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

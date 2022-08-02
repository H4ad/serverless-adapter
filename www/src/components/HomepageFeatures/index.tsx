import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use & Extensible',
    description: (
      <>The library was designed to be very extensible and easy to use.</>
    ),
  },
  {
    title: 'One library, many Serverless environments',
    description: (
      <>
        We currently support AWS, Azure and Huawei, but in the future we will add
        support for GCP and many other serverless environments.
      </>
    ),
  },
  {
    title: 'Fully Typed & Tested',
    description: (
      <>
        The entire library was written with typescript to give the developer the
        best experience and we have 100% coverage.
      </>
    ),
  },
];

function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4 mt-4')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
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

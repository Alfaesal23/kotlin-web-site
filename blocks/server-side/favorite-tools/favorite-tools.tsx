import React, { FC } from 'react';

import cn from 'classnames';

import styles from './favorite-tools.module.css';
import { useTextStyles } from '@rescui/typography';
import { Button } from '@rescui/button';
import Image from 'next/image';

import { ArrowTopRightIcon } from '@rescui/icons';

import ToolsImage1 from './images/tools-screen-2.webp';
import ToolsImage2 from './images/tools-screen-2.webp';

import IdeaLogo from './images/intellij-idea.svg'
import MavenLogo from './images/maven.svg';
import GradleLogo from './images/gradle.svg';
import AntLogo from './images/ant.svg';
import BazelLogo from './images/bazel.svg';

export const FavoriteTools: FC = ({}) => {

    const textCn = useTextStyles();

    return (
        <section className="ktl-layout ktl-layout--center">
            <div className="ktl-container section-offset" id={'tools'}>

                <h2 className={cn(textCn('rs-h1'))}>
                    Use your favorite tools
                </h2>

                <div className="ktl-row ktl-offset-top-l">
                    <div className="ktl-col-12 ktl-col-sm-8">
                        <Image src={ToolsImage1} alt={'IDE support'} className={styles.image} />
                    </div>
                    <div className="ktl-col-12 ktl-col-sm-4">
                        <h3 className={cn(textCn('rs-h3'), styles.sectionTitle, "spacer-md")}>
                            IDE support
                        </h3>

                        <p className={textCn('rs-text-2')}>
                            For a Java developer, getting started with Kotlin is very easy. Kotlin is natively supported
                            in IntelliJ IDEA, and the automated Java-to-Kotlin converter is there to help you with your
                            first steps. The powerful refactoring, navigation, and static code analysis features make
                            programming in Kotlin a pleasure!
                        </p>

                        <Button
                            href={'https://www.jetbrains.com/idea/download/'}
                            size={'l'} mode={'outline'} icon={<ArrowTopRightIcon />}
                            iconPosition={'right'}
                            data-testid={'download-idea-button'}
                        >
                            Download
                        </Button>

                        <div className={styles.logos}>
                            <img src={IdeaLogo.src} alt="IntelliJ IDEA logo" />
                        </div>
                    </div>
                </div>

                <div className="ktl-row ktl-offset-top-xl">
                    <div className="ktl-col-12 ktl-col-sm-4">
                        <h3 className={cn(textCn('rs-h3'), styles.sectionTitle)}>
                            Build tools
                        </h3>

                        <p className={textCn('rs-text-2')}>
                            Use your favorite build tool for building Kotlin programs. Plugins are available for <a
                            className={textCn('rs-link')}
                            href={'https://kotlinlang.org/docs/reference/using-gradle.html'}>Gradle</a>, <a
                            className={textCn('rs-link')}
                            href={'https://kotlinlang.org/docs/reference/using-maven.html'}>Maven</a>, <a
                            className={textCn('rs-link')}
                            href={'https://kotlinlang.org/docs/reference/using-ant.html'}>Ant</a>, and&nbsp;
                            <a className={textCn('rs-link')} href={'https://github.com/bazelbuild/rules_kotlin'}>Bazel
                                ↗</a>
                        </p>

                        <div className={styles.logos}>
                            <img src={MavenLogo.src} alt="Maven logo" />
                            <img src={GradleLogo.src} alt="Gradle logo" />
                            <img src={AntLogo.src} alt="Ant logo" />
                            <img src={BazelLogo.src} alt="Bazel logo" />
                        </div>
                    </div>
                    <div className="ktl-col-12 ktl-col-sm-8 spacer-md">
                        <Image src={ToolsImage2} alt={'Build tools'} className={styles.image} />
                    </div>
                </div>

            </div>
        </section>
    );
};

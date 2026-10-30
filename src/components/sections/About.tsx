import profileImage from "../../assets/profile.jpg";
import { SectionHead } from "../ui/SectionHead";
import styles from "./About.module.css";

export function About() {
  return (
    <section id="about" className={`section ${styles.about}`}>
      <SectionHead index={1} total={4} title="About" note="Who I am" />

      <div className={`paper ${styles.body}`}>
        <div className={`container ${styles.grid}`}>
          <figure className={styles.polaroid}>
            <span className="tape-strip" aria-hidden="true" />
            <div className={styles.photo}>
              <img src={profileImage} alt="Yavor Radulov" />
            </div>
            <figcaption className={styles.caption}>Yavor Radulov</figcaption>
          </figure>

          <div className={styles.copy}>
            <h3 className={`display ${styles.heading}`}>About me</h3>
            <p>
              I am a mobile and web developer with a strong proficiency in front-end development. Currently working
              professionally in the EV industry as a full-stack engineer at AMPECO, building solutions for electric
              vehicle charging infrastructure.
            </p>
            <p>
              I've worked on diverse projects ranging from developing and maintaining web, hybrid and native
              applications to building micro-services, infrastructure and AWS workflows. My professional experience
              includes enterprise pharmaceutical clients at MentorMate, the media giant The Sun at News UK, and the EV
              industry at AMPECO.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

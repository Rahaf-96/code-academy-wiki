import React, { Component } from 'react';
import './ProjectDetails.css';
import github from '../../images/github.svg';
import pc from '../../images/pc.svg';
import ProjectView from '../../SharedComponents/ProjectView';
import StudentCard from '../../SharedComponents/StudentCard';
import { Link } from 'react-router-dom';
import axios from 'axios';
class ProjectDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
    };
  }
  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    // id coming from cohorts and studentProfile pages
    axios
      .get(`/api/project/${params.id}`)
      .then((res) => {
        const resultArray = res.data;
        console.log(resultArray);
        this.setState({
          projects: resultArray,
        });
      })
      .catch((error) => error.response);
  }
  render() {
    const { projects } = this.state;

    return (
      <div className='projectdetails-container'>
        {!projects.length ? (
          <div className='loading-container'>
            <h1 className='loading'> </h1>
          </div>
        ) : (
          <div>
            <section className='projects-details'>
              <div className='projects-info' key={projects.id}>
                <h2 className='project-title'>{projects[0].title}</h2>
                <p className='project-desc'>{projects[0].description}</p>
                <div className='icon-images'>
                  <div className='github-name'>
                    <a
                      href={projects[0].github}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <img
                        className='github-img'
                        src={github}
                        alt='github icon'
                      />
                    </a>
                    GitHub
                  </div>
                  <div className='heroku-name'>
                    <a
                      href={projects[0].heroku}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <img className='pc-img' src={pc} alt='pc icon' />
                    </a>
                    LiveView
                  </div>
                </div>
              </div>
              <div>
                <ProjectView
                  projectDetailsStyle={true}
                  projectImg={projects[0].image}
                />
              </div>
            </section>

            <section className='team-members'>
              <div className='title'> Team Members</div>
              <div className='students-info'>
                {projects.map((student) => {
                  return (
                    <Link to={`/student/${student.id}`} className='text-link'>
                      <StudentCard
                        studentImg={student.img}
                        studentname={student.name}
                      />
                    </Link>
                  );
                })}
              </div>
            </section>
          </div>
        )}
      </div>
    );
  }
}

export default ProjectDetails;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';

// api
import { QUERY } from '../services/api';

// Components
import { Layout, Breadcrumb } from 'antd';
import Character from '../components/characters/character';
import EpisodesList from '../components/episodes/EpisodesList';
import Loading from '../components/loading';
import Alert from '../components/alert';


export default class Profile extends Component {
    constructor(props) {
      super(props);

      this.state = {}
    }

    render() {
      return (
        <Query query={QUERY.GET_CHARACTER} variables={{ id: this.props.match.params.id }}>
          { ({ loading, error, data }) => {
              return (
                <>
                  <Layout.Header style={{ background: '#fff', padding: 5 }}>
                    <Layout.Content style={{ margin: '0 16px' }}>
                      <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>
                            <Link to="/">
                              Characters
                            </Link>
                          </Breadcrumb.Item>
                          <Breadcrumb.Item>
                            <strong style={{ color: '#1890ff' }}>
                              { data
                                ? data.character.name
                                : 'loading...'
                              }
                            </strong>
                          </Breadcrumb.Item>
                      </Breadcrumb>
                    </Layout.Content>
                  </Layout.Header>
                  
                  <Layout.Content style={{ padding: '5%' }}>
                    { loading && <Loading /> }
                    { error && <Alert message="Error" description="Intentelo mas tarde. " type="warning" /> }
                    { data && <Character character={ data.character } /> }
                    <br />
                    { data && <EpisodesList episodes={ data.character.episode } /> }
                  </Layout.Content>
                </>
              );
            }
          }
        </Query>
      );
    }
}
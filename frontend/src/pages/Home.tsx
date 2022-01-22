import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import AppContext from "../context/App";
import Layout from "../components/Layout";

interface TitleProps {
  children?: React.ReactNode;
}

function Title(props: TitleProps) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

interface Props {}
interface State {
  activity: {
    id: number;
    user_id: number;
    type: string;
    created_at: string;
	}[];
	version: string;
}

class Home extends React.Component<Props, State> {
  static contextType = AppContext;

  constructor(props: Props) {
    super(props);

    this.state = {
			activity: [],
			version: '',
    };
  }

  componentDidMount() {
    this.context.api
      .listUserActivity(this.context.getCurrentUser().id)
      .then((activity: State["activity"]) => {
        this.setState((state, props) => {
          return { activity: activity };
        });
			});

			this.context.api
				.getBackendVersion()
				.then((version: State["version"]) => {
					this.setState((state, props) => {
						return { version: version };
					});
				});
  }

  render() {
    return (
      <Layout>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
					<Typography component="h4" variant="h4" gutterBottom>
						Hello, {this.context.getCurrentUser().name}
					</Typography>
					<Typography component="h5" variant="h5" color="info" gutterBottom>
						Frontend Version: {process.env.REACT_APP_APP_VERSION}
					</Typography>
					{this.state.version && (
					<Typography component="h5" variant="h5" color="info" gutterBottom>
						Backend Version: {this.state.version}
					</Typography>
					)}
          <Title>Last Logins</Title>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.activity.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>{activity.id}</TableCell>
                  <TableCell>{activity.type}</TableCell>
                  <TableCell>{activity.created_at}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Layout>
    );
  }
}

export default Home;

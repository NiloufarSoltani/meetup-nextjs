import { MongoClient } from "mongodb";
import Head from 'next/head';
import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return <>
  <Head>
    <title>React Meetups</title>
    <meta name="description" content="Here is one of the largest meetup pages with React and Next.js" />
  </Head>
  <MeetupList meetups={props.meetups} />
  </>;
};

export const getStaticProps = async () => {
  const client = await MongoClient.connect('mongodb+srv://nilooooyi:8vg5P7zFu22IlcL5@meetup.wkrlxt6.mongodb.net/?retryWrites=true&w=majority');
  const db = client.db();
  const meetupCollection = db.collection('meetups');

  const meetups = await meetupCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map(meetup => ({id: meetup._id.toString(), image: meetup.image, title: meetup.title, address: meetup.address})),
    },
    revalidate: 1
  };
};

export default HomePage;

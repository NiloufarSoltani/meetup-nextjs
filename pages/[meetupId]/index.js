import { MongoClient, ObjectId } from "mongodb";
import Head from 'next/head';

import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetailPage = (props) => {
  return (
    <>
      <Head>
        <title>{props.meetup.title}</title>
        <meta name="description" content={props.meetup.description}/>
      </Head>
      <MeetupDetail
        title={props.meetup.title}
        id={props.meetup.id}
        image={props.meetup.image}
        address={props.meetup.address}
        description={props.meetup.description}
      />
    </>
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://nilooooyi:8vg5P7zFu22IlcL5@meetup.wkrlxt6.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: true,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
};

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://nilooooyi:8vg5P7zFu22IlcL5@meetup.wkrlxt6.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");

  const selectedMeetup = await meetupCollection.findOne({
    _id: new ObjectId(meetupId),
  });
  // console.log('selectedMeetup', selectedMeetup);
  client.close();

  return {
    props: {
      meetup: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
};
export default MeetupDetailPage;

import { gql } from "@apollo/client";

export type Note = {
  id: string;
  comment: string;
  timestamp: number;
};
export type Bird = {
  id: string;
  english_name: string;
  latin_name: string;
  image_url: string;
  thumb_url: string;
  notes: Note[];
};
export const GET_BIRDS = gql`
  query Birds {
    birds {
      id
      english_name
      thumb_url
      latin_name
    }
  }
`;

export const GET_BIRD = gql`
  query Bird($id: ID!) {
    bird(id: $id) {
      id
      english_name
      thumb_url
      latin_name
      image_url
      notes {
        id
        comment
      }
    }
  }
`;

export const ADD_NOTE = gql`
  mutation AddNote($birdId: ID!, $comment: String!, $timestamp: Int!) {
    addNote(birdId: $birdId, comment: $comment, timestamp: $timestamp)
  }
`;

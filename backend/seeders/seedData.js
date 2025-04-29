import mongoose from 'mongoose';
import Contests from '../models/contestModel.js';
import Leaderboard from '../models/leaderboardModel.js';
import Question from '../models/questionModel.js';
import Submission from '../models/submissionModel.js';
import User from '../models/userModel.js';
import dotenv from 'dotenv';
dotenv.config();

const contestData = [
    {
        "name": "Tech Trivia Challenge",
        "description": "Test your knowledge of the latest technology trends and history.",
        "startTime": "2025-05-05T10:00:00.000Z",
        "endTime": "2025-05-05T12:00:00.000Z",
        "isVipOnly": "false",
        "questions": [
            "6456a7b2e9d3f41a2b3c4d5e",
            "6456a7b2e9d3f41a2b3c4d5f",
            "6456a7b2e9d3f41a2b3c4d60"
        ]
    },
    {
        "name": "Global History Quiz",
        "description": "A journey through significant events and figures in world history.",
        "startTime": "2025-05-12T14:00:00.000Z",
        "endTime": "2025-05-12T16:00:00.000Z",
        "isVipOnly": "true",
        "questions": [
            "6456a7b2e9d3f41a2b3c4d61",
            "6456a7b2e9d3f41a2b3c4d62"
        ]
    },
    {
        "name": "Science Explorers",
        "description": "Explore the wonders of biology, chemistry, and physics.",
        "startTime": "2025-05-19T09:00:00.000Z",
        "endTime": "2025-05-19T11:00:00.000Z",
        "isVipOnly": "false",
        "questions": [
            "6456a7b2e9d3f41a2b3c4d63",
            "6456a7b2e9d3f41a2b3c4d64",
            "6456a7b2e9d3f41a2b3c4d65",
            "6456a7b2e9d3f41a2b3c4d66"
        ]
    },
    {
        "name": "Literary Legends",
        "description": "A quiz on classic and contemporary literature.",
        "startTime": "2025-05-26T16:30:00.000Z",
        "endTime": "2025-05-26T18:00:00.000Z",
        "isVipOnly": "true",
        "questions": [
            "6456a7b2e9d3f41a2b3c4d67",
            "6456a7b2e9d3f41a2b3c4d68"
        ]
    },
    {
        "name": "Movie Mania",
        "description": "Test your knowledge of films across different genres and eras.",
        "startTime": "2025-06-02T19:00:00.000Z",
        "endTime": "2025-06-02T21:00:00.000Z",
        "isVipOnly": "false",
        "questions": [
            "6456a7b2e9d3f41a2b3c4d69",
            "6456a7b2e9d3f41a2b3c4d6a",
            "6456a7b2e9d3f41a2b3c4d6b"
        ]
    },
    {
        "name": "Coding Challenge - Basics",
        "description": "Fundamental concepts of programming and algorithms.",
        "startTime": "2025-06-09T11:00:00.000Z",
        "endTime": "2025-06-09T13:00:00.000Z",
        "isVipOnly": "false",
        "questions": [
            "6456a7b2e9d3f41a2b3c4d6c",
            "6456a7b2e9d3f41a2b3c4d6d"
        ]
    },
    {
        "name": "Art Appreciation",
        "description": "Explore different art movements and famous artists.",
        "startTime": "2025-06-16T15:00:00.000Z",
        "endTime": "2025-06-16T17:00:00.000Z",
        "isVipOnly": "true",
        "questions": [
            "6456a7b2e9d3f41a2b3c4d6e",
            "6456a7b2e9d3f41a2b3c4d6f",
            "6456a7b2e9d3f41a2b3c4d70"
        ]
    },
    {
        "name": "Music Maestro",
        "description": "A quiz on musical history, theory, and famous compositions.",
        "startTime": "2025-06-23T18:30:00.000Z",
        "endTime": "2025-06-23T20:00:00.000Z",
        "isVipOnly": "false",
        "questions": [
            "6456a7b2e9d3f41a2b3c4d71",
            "6456a7b2e9d3f41a2b3c4d72"
        ]
    },
    {
        "name": "Geography Guru",
        "description": "Test your knowledge of countries, capitals, and geographical features.",
        "startTime": "2025-06-30T10:30:00.000Z",
        "endTime": "2025-06-30T12:30:00.000Z",
        "isVipOnly": "false",
        "questions": [
            "6456a7b2e9d3f41a2b3c4d73",
            "6456a7b2e9d3f41a2b3c4d74",
            "6456a7b2e9d3f41a2b3c4d75"
        ]
    },
    {
        "name": "Sports Spectacle",
        "description": "A quiz covering various sports and their iconic moments.",
        "startTime": "2025-07-07T17:00:00.000Z",
        "endTime": "2025-07-07T19:00:00.000Z",
        "isVipOnly": "true",
        "questions": [
            "6456a7b2e9d3f41a2b3c4d76",
            "6456a7b2e9d3f41a2b3c4d77"
        ]
    },
    {
        "name": "Space Odyssey",
        "description": "Explore the mysteries of the universe and space exploration.",
        "startTime": "2025-07-14T14:30:00.000Z",
        "endTime": "2025-07-14T16:30:00.000Z",
        "isVipOnly": "true",
        "questions": [
            "6456a7b2e9d3f41a2b3c4d78",
            "6456a7b2e9d3f41a2b3c4d79",
            "6456a7b2e9d3f41a2b3c4d7a"
        ]
    },
    {
        "name": "Culinary Challenge",
        "description": "A quiz on food history, ingredients, and cooking techniques.",
        "startTime": "2025-07-21T11:30:00.000Z",
        "endTime": "2025-07-21T13:30:00.000Z",
        "isVipOnly": "false",
        "questions": [
            "6456a7b2e9d3f41a2b3c4d7b",
            "6456a7b2e9d3f41a2b3c4d7c"
        ]
    },
    {
        "name": "Ancient Civilizations",
        "description": "Discover the wonders of past civilizations and their legacies.",
        "startTime": "2025-07-28T16:00:00.000Z",
        "endTime": "2025-07-28T18:00:00.000Z",
        "isVipOnly": "true",
        "questions": [
            "6456a7b2e9d3f41a2b3c4d7d",
            "6456a7b2e9d3f41a2b3c4d7e",
            "6456a7b2e9d3f41a2b3c4d7f"
        ]
    },
    {
        "name": "Wildlife Wonders",
        "description": "A quiz on animals, their habitats, and conservation efforts.",
        "startTime": "2025-08-04T09:30:00.000Z",
        "endTime": "2025-08-04T11:30:00.000Z",
        "isVipOnly": "false",
        "questions": [
            "6456a7b2e9d3f41a2b3c4d80",
            "6456a7b2e9d3f41a2b3c4d81"
        ]
    },
    {
        "name": "Political Pundits",
        "description": "Test your knowledge of global politics and current affairs.",
        "startTime": "2025-08-11T17:30:00.000Z",
        "endTime": "2025-08-11T19:30:00.000Z",
        "isVipOnly": "false",
        "questions": [
            "6456a7b2e9d3f41a2b3c4d82",
            "6456a7b2e9d3f41a2b3c4d83",
            "6456a7b2e9d3f41a2b3c4d84"
        ]
    },
    {
        "name": "Financial Fortress",
        "description": "A quiz on economics, finance, and investment strategies.",
        "startTime": "2025-08-18T12:00:00.000Z",
        "endTime": "2025-08-18T14:00:00.000Z",
        "isVipOnly": "false",
        "questions": [
            "6456a7b2e9d3f41a2b3c4d85",
            "6456a7b2e9d3f41a2b3c4d86"
        ]
    },
    {
        "name": "Mythology Mania",
        "description": "Explore the fascinating world of myths and legends from different cultures.",
        "startTime": "2025-08-25T18:00:00.000Z",
        "endTime": "2025-08-25T20:00:00.000Z",
        "isVipOnly": "true",
        "questions": [
            "6456a7b2e9d3f41a2b3c4d87",
            "6456a7b2e9d3f41a2b3c4d88",
            "6456a7b2e9d3f41a2b3c4d89"
        ]
    },
    {
        "name": "Health & Wellness Quiz",
        "description": "Test your knowledge of nutrition, fitness, and well-being.",
        "startTime": "2025-09-01T10:00:00.000Z",
        "endTime": "2025-09-01T12:00:00.000Z",
        "isVipOnly": "false",
        "questions": [
            "6456a7b2e9d3f41a2b3c4d8a",
            "6456a7b2e9d3f41a2b3c4d8b"
        ]
    },
    {
        "name": "Environmental Explorers",
        "description": "A quiz on ecology, conservation, and environmental issues.",
        "startTime": "2025-09-08T15:30:00.000Z",
        "endTime": "2025-09-08T17:30:00.000Z",
        "isVipOnly": "false",
        "questions": [
            "6456a7b2e9d3f41a2b3c4d8c",
            "6456a7b2e9d3f41a2b3c4d8d",
            "6456a7b2e9d3f41a2b3c4d8e"
        ]
    },
    {
        "name": "Logic & Reasoning Challenge",
        "description": "Test your problem-solving and logical thinking skills.",
        "startTime": "2025-09-15T19:00:00.000Z",
        "endTime": "2025-09-15T21:00:00.000Z",
        "isVipOnly": "false",
        "questions": [
            "6456a7b2e9d3f41a2b3c4d8f",
            "6456a7b2e9d3f41a2b3c4d90"
        ]
    },
    {
        "name": "Travel Trivia",
        "description": "A quiz on famous landmarks, cultures, and travel destinations.",
        "startTime": "2025-09-22T11:00:00.000Z",
        "endTime": "2025-09-22T13:00:00.000Z",
        "isVipOnly": "false",
        "questions": [
            "6456a7b2e9d3f41a2b3c4d91",
            "6456a7b2e9d3f41a2b3c4d92",
            "6456a7b2e9d3f41a2b3c4d93"
        ]
    },
    {
        "name": "Business Brainiacs",
        "description": "A quiz on business strategy, marketing, and entrepreneurship.",
        "startTime": "2025-09-29T16:30:00.000Z",
        "endTime": "2025-09-29T18:30:00.000Z",
        "isVipOnly": "false",
        "questions": [
            "6456a7b2e9d3f41a2b3c4d94",
            "6456a7b2e9d3f41a2b3c4d95"
        ]
    }
];

const leaderboardData = [
    {
        "contestId": "6456a7b2e9d3f41a2b3d0001",
        "userId": "6456a7b2e9d3f41a2b3c0001",
        "score": 5,
        "rank": 1
    },
    {
        "contestId": "6456a7b2e9d3f41a2b3d0001",
        "userId": "6456a7b2e9d3f41a2b3c0003",
        "score": 4,
        "rank": 2
    },
    {
        "contestId": "6456a7b2e9d3f41a2b3d0001",
        "userId": "6456a7b2e9d3f41a2b3c0002",
        "score": 3,
        "rank": 3
    },
    {
        "contestId": "6456a7b2e9d3f41a2b3d0002",
        "userId": "6456a7b2e9d3f41a2b3c0004",
        "score": 7,
        "rank": 1
    },
    {
        "contestId": "6456a7b2e9d3f41a2b3d0002",
        "userId": "6456a7b2e9d3f41a2b3c0001",
        "score": 6,
        "rank": 2
    },
    {
        "contestId": "6456a7b2e9d3f41a2b3d0003",
        "userId": "6456a7b2e9d3f41a2b3c0006",
        "score": 9,
        "rank": 1
    },
    {
        "contestId": "6456a7b2e9d3f41a2b3d0003",
        "userId": "6456a7b2e9d3f41a2b3c0005",
        "score": 8,
        "rank": 2
    },
    {
        "contestId": "6456a7b2e9d3f41a2b3d0004",
        "userId": "6456a7b2e9d3f41a2b3c0002",
        "score": 10,
        "rank": 1
    },
    {
        "contestId": "6456a7b2e9d3f41a2b3d0004",
        "userId": "6456a7b2e9d3f41a2b3c0007",
        "score": 9,
        "rank": 2
    },
    {
        "contestId": "6456a7b2e9d3f41a2b3d0005",
        "userId": "6456a7b2e9d3f41a2b3c0009",
        "score": 12,
        "rank": 1
    },
    {
        "contestId": "6456a7b2e9d3f41a2b3d0005",
        "userId": "6456a7b2e9d3f41a2b3c0008",
        "score": 11,
        "rank": 2
    },
    {
        "contestId": "6456a7b2e9d3f41a2b3d0006",
        "userId": "6456a7b2e9d3f41a2b3c0003",
        "score": 15,
        "rank": 1
    },
    {
        "contestId": "6456a7b2e9d3f41a2b3d0006",
        "userId": "6456a7b2e9d3f41a2b3c0010",
        "score": 14,
        "rank": 2
    },
    {
        "contestId": "6456a7b2e9d3f41a2b3d0007",
        "userId": "6456a7b2e9d3f41a2b3c0005",
        "score": 18,
        "rank": 1
    },
    {
        "contestId": "6456a7b2e9d3f41a2b3d0007",
        "userId": "6456a7b2e9d3f41a2b3c0004",
        "score": 17,
        "rank": 2
    },
    {
        "contestId": "6456a7b2e9d3f41a2b3d0008",
        "userId": "6456a7b2e9d3f41a2b3c0001",
        "score": 20,
        "rank": 1
    }
];

const questionsData = [
    {
        "text": "What is the capital of France?",
        "options": ["Berlin", "Madrid", "Paris", "Rome"],
        "correctAnswer": "Paris",
        "questType": 2
    },
    {
        "text": "Which planet is known as the 'Red Planet'?",
        "options": ["Mars", "Jupiter", "Venus", "Saturn"],
        "correctAnswer": "Mars",
        "questType": 2
    },
    {
        "text": "What is the chemical symbol for water?",
        "options": ["H2O", "CO2", "O2", "N2"],
        "correctAnswer": "H2O",
        "questType": 2
    },
    {
        "text": "Who painted the Mona Lisa?",
        "options": ["Leonardo da Vinci", "Michelangelo", "Raphael", "Donatello"],
        "correctAnswer": "Leonardo da Vinci",
        "questType": 2
    },
    {
        "text": "What is the largest mammal in the world?",
        "options": ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
        "correctAnswer": "Blue Whale",
        "questType": 2
    },
    {
        "text": "In which year did World War II end?",
        "options": ["1945", "1939", "1950", "1941"],
        "correctAnswer": "1945",
        "questType": 2
    },
    {
        "text": "What is the currency of Japan?",
        "options": ["Yen", "Euro", "Dollar", "Pound"],
        "correctAnswer": "Yen",
        "questType": 2
    },
    {
        "text": "What is the powerhouse of the cell?",
        "options": ["Mitochondria", "Nucleus", "Ribosome", "Endoplasmic Reticulum"],
        "correctAnswer": "Mitochondria",
        "questType": 2
    },
    {
        "text": "Who wrote the play 'Hamlet'?",
        "options": ["William Shakespeare", "Jane Austen", "Charles Dickens", "George Orwell"],
        "correctAnswer": "William Shakespeare",
        "questType": 2
    },
    {
        "text": "What is the highest mountain in the world?",
        "options": ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
        "correctAnswer": "Mount Everest",
        "questType": 2
    },
    {
        "text": "What is the chemical symbol for gold?",
        "options": ["Au", "Ag", "Fe", "Cu"],
        "correctAnswer": "Au",
        "questType": 2
    },
    {
        "text": "Who developed the theory of relativity?",
        "options": ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Stephen Hawking"],
        "correctAnswer": "Albert Einstein",
        "questType": 2
    },
    {
        "text": "What is the largest ocean on Earth?",
        "options": ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
        "correctAnswer": "Pacific Ocean",
        "questType": 2
    },
    {
        "text": "In which year did the first human land on the moon?",
        "options": ["1969", "1957", "1975", "1986"],
        "correctAnswer": "1969",
        "questType": 2
    },
    {
        "text": "What is the capital of Australia?",
        "options": ["Sydney", "Melbourne", "Canberra", "Perth"],
        "correctAnswer": "Canberra",
        "questType": 2
    },
    {
        "text": "What is the function of red blood cells?",
        "options": ["Carry oxygen", "Fight infection", "Clot blood", "Produce hormones"],
        "correctAnswer": "Carry oxygen",
        "questType": 2
    },
    {
        "text": "Who painted the 'Starry Night'?",
        "options": ["Vincent van Gogh", "Claude Monet", "Pablo Picasso", "Salvador Dalí"],
        "correctAnswer": "Vincent van Gogh",
        "questType": 2
    },
    {
        "text": "What is the smallest continent?",
        "options": ["Australia", "Europe", "Asia", "Africa"],
        "correctAnswer": "Australia",
        "questType": 2
    },
    {
        "text": "What is the chemical symbol for carbon dioxide?",
        "options": ["CO2", "H2O", "O2", "CH4"],
        "correctAnswer": "CO2",
        "questType": 2
    },
    {
        "text": "Who invented the telephone?",
        "options": ["Alexander Graham Bell", "Thomas Edison", "Nikola Tesla", "Guglielmo Marconi"],
        "correctAnswer": "Alexander Graham Bell",
        "questType": 2
    },
    {
        "text": "What is the largest desert in the world (by area)?",
        "options": ["Antarctic Polar Desert", "Sahara Desert", "Arabian Desert", "Gobi Desert"],
        "correctAnswer": "Antarctic Polar Desert",
        "questType": 2
    },
    {
        "text": "In which year did the Titanic sink?",
        "options": ["1912", "1905", "1923", "1931"],
        "correctAnswer": "1912",
        "questType": 2
    },
    {
        "text": "What is the capital of Canada?",
        "options": ["Toronto", "Montreal", "Ottawa", "Vancouver"],
        "correctAnswer": "Ottawa",
        "questType": 2
    },
    {
        "text": "What is the main function of the kidneys?",
        "options": ["Filter blood", "Pump blood", "Digest food", "Produce insulin"],
        "correctAnswer": "Filter blood",
        "questType": 2
    },
    {
        "text": "Who sculpted the statue of David?",
        "options": ["Michelangelo", "Leonardo da Vinci", "Donatello", "Raphael"],
        "correctAnswer": "Michelangelo",
        "questType": 2
    },
    {
        "text": "What is the longest river in the world?",
        "options": ["Nile", "Amazon", "Yangtze", "Mississippi"],
        "correctAnswer": "Nile",
        "questType": 2
    },
    {
        "text": "What is the chemical symbol for oxygen?",
        "options": ["O2", "CO2", "N2", "H2"],
        "correctAnswer": "O2",
        "questType": 2
    },
    {
        "text": "Who discovered penicillin?",
        "options": ["Alexander Fleming", "Marie Curie", "Louis Pasteur", "Robert Koch"],
        "correctAnswer": "Alexander Fleming",
        "questType": 2
    },
    {
        "text": "What is the saltiest sea in the world?",
        "options": ["Dead Sea", "Mediterranean Sea", "Red Sea", "Black Sea"],
        "correctAnswer": "Dead Sea",
        "questType": 2
    },
    {
        "text": "In which year did the Cold War officially end?",
        "options": ["1991", "1985", "2000", "1979"],
        "correctAnswer": "1991",
        "questType": 2
    },
    {
        "text": "What is the capital of Brazil?",
        "options": ["Rio de Janeiro", "São Paulo", "Brasília", "Buenos Aires"],
        "correctAnswer": "Brasília",
        "questType": 2
    },
    {
        "text": "What is the primary function of the lungs?",
        "options": ["Gas exchange", "Pump blood", "Filter waste", "Produce enzymes"],
        "correctAnswer": "Gas exchange",
        "questType": 2
    },
    {
        "text": "Who composed the 'Moonlight Sonata'?",
        "options": ["Ludwig van Beethoven", "Wolfgang Amadeus Mozart", "Johann Sebastian Bach", "Frédéric Chopin"],
        "correctAnswer": "Ludwig van Beethoven",
        "questType": 2
    },
    {
        "text": "What is the largest lake in the world (by surface area)?",
        "options": ["Caspian Sea", "Lake Superior", "Lake Victoria", "Lake Huron"],
        "correctAnswer": "Caspian Sea",
        "questType": 2
    },
    {
        "text": "What is the chemical symbol for nitrogen?",
        "options": ["N2", "O2", "CO2", "He"],
        "correctAnswer": "N2",
        "questType": 2
    },
    {
        "text": "Who developed the polio vaccine?",
        "options": ["Jonas Salk", "Albert Sabin", "Edward Jenner", "Louis Pasteur"],
        "correctAnswer": "Jonas Salk",
        "questType": 2
    },
    {
        "text": "What is the driest desert in the world?",
        "options": ["Atacama Desert", "Sahara Desert", "Gobi Desert", "Antarctic Polar Desert"],
        "correctAnswer": "Atacama Desert",
        "questType": 2
    },
    {
        "text": "In which year did the Berlin Wall fall?",
        "options": ["1989", "1975", "1995", "2001"],
        "correctAnswer": "1989",
        "questType": 2
    },
    {
        "text": "What is the capital of India?",
        "options": ["Mumbai", "Kolkata", "New Delhi", "Chennai"],
        "correctAnswer": "New Delhi",
        "questType": 2
    },
    {
        "text": "What is the main function of the liver?",
        "options": ["Process toxins", "Pump blood", "Digest food", "Store energy"],
        "correctAnswer": "Process toxins",
        "questType": 2
    },
    {
        "text": "Who wrote the novel 'Pride and Prejudice'?",
        "options": ["Jane Austen", "Charlotte Brontë", "Emily Brontë", "George Eliot"],
        "correctAnswer": "Jane Austen",
        "questType": 2
    },
    {
        "text": "What is the deepest point in the Earth's oceans?",
        "options": ["Mariana Trench", "Puerto Rico Trench", "Java Trench", "South Sandwich Trench"],
        "correctAnswer": "Mariana Trench",
        "questType": 2
    },
    {
        "text": "What is the chemical symbol for helium?",
        "options": ["He", "H", "Ne", "Ar"],
        "correctAnswer": "He",
        "questType": 2
    },
    {
        "text": "Who is credited with inventing the World Wide Web?",
        "options": ["Tim Berners-Lee", "Bill Gates", "Steve Jobs", "Mark Zuckerberg"],
        "correctAnswer": "Tim Berners-Lee",
        "questType": 2
    },
    {
        "text": "What is the largest island in the world?",
        "options": ["Greenland", "New Guinea", "Borneo", "Madagascar"],
        "correctAnswer": "Greenland",
        "questType": 2
    },
    {
        "text": "In which year did the United States declare independence?",
        "options": ["1776", "1789", "1801", "1765"],
        "correctAnswer": "1776",
        "questType": 2
    },
    {
        "text": "What is the capital of South Africa?",
        "options": ["Cape Town", "Johannesburg", "Pretoria", "Durban"],
        "correctAnswer": "Pretoria",
        "questType": 2
    },
    {
        "text": "What is the primary function of the pancreas?",
        "options": ["Produce insulin", "Filter blood", "Digest food", "Store vitamins"],
        "correctAnswer": "Produce insulin",
        "questType": 2
    },
    {
        "text": "Who painted the 'Last Supper'?",
        "options": ["Leonardo da Vinci", "Michelangelo", "Raphael", "Titian"],
        "correctAnswer": "Leonardo da Vinci",
        "questType": 2
    }
];

const submissionData = [
    {
        "userId": "6456a7b2e9d3f41a2b3c0001",
        "contestId": "6456a7b2e9d3f41a2b3d0001",
        "answers": {
            "6456a7b2e9d3f41a2b3c4d5e": "Paris",
            "6456a7b2e9d3f41a2b3c4d5f": "Mars"
        },
        "score": 2,
        "submittedAt": "2025-05-05T11:55:00.000Z"
    },
    {
        "userId": "6456a7b2e9d3f41a2b3c0002",
        "contestId": "6456a7b2e9d3f41a2b3d0001",
        "answers": {
            "6456a7b2e9d3f41a2b3c4d5e": "Berlin",
            "6456a7b2e9d3f41a2b3c4d5f": "Mars"
        },
        "score": 1,
        "submittedAt": "2025-05-05T11:58:30.000Z"
    },
    {
        "userId": "6456a7b2e9d3f41a2b3c0003",
        "contestId": "6456a7b2e9d3f41a2b3d0002",
        "answers": {
            "6456a7b2e9d3f41a2b3c4d61": "1945",
            "6456a7b2e9d3f41a2b3c4d62": "Yen"
        },
        "score": 2,
        "submittedAt": "2025-05-12T15:45:00.000Z"
    },
    {
        "userId": "6456a7b2e9d3f41a2b3c0001",
        "contestId": "6456a7b2e9d3f41a2b3d0002",
        "answers": {
            "6456a7b2e9d3f41a2b3c4d61": "1939",
            "6456a7b2e9d3f41a2b3c4d62": "Yen"
        },
        "score": 1,
        "submittedAt": "2025-05-12T15:52:15.000Z"
    },
    {
        "userId": "6456a7b2e9d3f41a2b3c0004",
        "contestId": "6456a7b2e9d3f41a2b3d0003",
        "answers": {
            "6456a7b2e9d3f41a2b3c4d63": "Mitochondria",
            "6456a7b2e9d3f41a2b3c4d64": "William Shakespeare"
        },
        "score": 2,
        "submittedAt": "2025-05-19T10:30:00.000Z"
    },
    {
        "userId": "6456a7b2e9d3f41a2b3c0002",
        "contestId": "6456a7b2e9d3f41a2b3d0003",
        "answers": {
            "6456a7b2e9d3f41a2b3c4d63": "Nucleus",
            "6456a7b2e9d3f41a2b3c4d64": "William Shakespeare"
        },
        "score": 1,
        "submittedAt": "2025-05-19T10:40:45.000Z"
    },
    {
        "userId": "6456a7b2e9d3f41a2b3c0005",
        "contestId": "6456a7b2e9d3f41a2b3d0004",
        "answers": {
            "6456a7b2e9d3f41a2b3c4d67": "Jane Austen",
            "6456a7b2e9d3f41a2b3c4d68": "Australia"
        },
        "score": 2,
        "submittedAt": "2025-05-26T17:45:00.000Z"
    },
    {
        "userId": "6456a7b2e9d3f41a2b3c0003",
        "contestId": "6456a7b2e9d3f41a2b3d0004",
        "answers": {
            "6456a7b2e9d3f41a2b3c4d67": "Charlotte Brontë",
            "6456a7b2e9d3f41a2b3c4d68": "Asia"
        },
        "score": 0,
        "submittedAt": "2025-05-26T17:51:30.000Z"
    },
    {
        "userId": "6456a7b2e9d3f41a2b3c0006",
        "contestId": "6456a7b2e9d3f41a2b3d0005",
        "answers": {
            "6456a7b2e9d3f41a2b3c4d69": "Action",
            "6456a7b2e9d3f41a2b3c4d6a": "1990"
        },
        "score": 1,
        "submittedAt": "2025-06-02T20:30:00.000Z"
    },
    {
        "userId": "6456a7b2e9d3f41a2b3c0004",
        "contestId": "6456a7b2e9d3f41a2b3d0005",
        "answers": {
            "6456a7b2e9d3f41a2b3c4d69": "Comedy",
            "6456a7b2e9d3f41a2b3c4d6a": "1990"
        },
        "score": 1,
        "submittedAt": "2025-06-02T20:42:00.000Z"
    },
    {
        "userId": "6456a7b2e9d3f41a2b3c0007",
        "contestId": "6456a7b2e9d3f41a2b3d0006",
        "answers": {
            "6456a7b2e9d3f41a2b3c4d6c": "Function",
            "6456a7b2e9d3f41a2b3c4d6d": "Array"
        },
        "score": 2,
        "submittedAt": "2025-06-09T12:15:00.000Z"
    },
    {
        "userId": "6456a7b2e9d3f41a2b3c0005",
        "contestId": "6456a7b2e9d3f41a2b3d0006",
        "answers": {
            "6456a7b2e9d3f41a2b3c4d6c": "Variable",
            "6456a7b2e9d3f41a2b3c4d6d": "Object"
        },
        "score": 0,
        "submittedAt": "2025-06-09T12:28:45.000Z"
    },
    {
        "userId": "6456a7b2e9d3f41a2b3c0008",
        "contestId": "6456a7b2e9d3f41a2b3d0007",
        "answers": {
            "6456a7b2e9d3f41a2b3c4d6e": "Impressionism",
            "6456a7b2e9d3f41a2b3c4d6f": "Van Gogh"
        },
        "score": 1,
        "submittedAt": "2025-06-16T16:40:00.000Z"
    },
    {
        "userId": "6456a7b2e9d3f41a2b3c0006",
        "contestId": "6456a7b2e9d3f41a2b3d0007",
        "answers": {
            "6456a7b2e9d3f41a2b3c4d6e": "Surrealism",
            "6456a7b2e9d3f41a2b3c4d6f": "Picasso"
        },
        "score": 0,
        "submittedAt": "2025-06-16T16:55:15.000Z"
    },
    {
        "userId": "6456a7b2e9d3f41a2b3c0009",
        "contestId": "6456a7b2e9d3f41a2b3d0008",
        "answers": {
            "6456a7b2e9d3f41a2b3c4d71": "Baroque",
            "6456a7b2e9d3f41a2b3c4d72": "Bach"
        },
        "score": 1,
        "submittedAt": "2025-06-23T19:30:00.000Z"
    },
    {
        "userId": "6456a7b2e9d3f41a2b3c0007",
        "contestId": "6456a7b2e9d3f41a2b3d0008",
        "answers": {
            "6456a7b2e9d3f41a2b3c4d71": "Classical",
            "6456a7b2e9d3f41a2b3c4d72": "Mozart"
        },
        "score": 1,
        "submittedAt": "2025-06-23T19:41:45.000Z"
    }
];

const usersData = [
    {
        "name": "Alice Wonderland",
        "email": "alice.wonderland@example.com",
        "password": "password123"
    },
    {
        "name": "Bob The Builder",
        "email": "bob.builder@example.com",
        "password": "builditstrong"
    },
    {
        "name": "Charlie Chaplin",
        "email": "charlie.chaplin@example.com",
        "password": "silentfilmstar"
    },
    {
        "name": "Diana Prince",
        "email": "diana.prince@example.com",
        "password": "amazonprincess"
    },
    {
        "name": "Ethan Hunt",
        "email": "ethan.hunt@example.com",
        "password": "missionimpossible"
    },
    {
        "name": "Fiona Farquaad",
        "email": "fiona.farquaad@example.com",
        "password": "ogresspower"
    },
    {
        "name": "George Jetson",
        "email": "george.jetson@example.com",
        "password": "spacelife2000"
    },
    {
        "name": "Hermione Granger",
        "email": "hermione.granger@example.com",
        "password": "witchcraftandwizardry"
    },
    {
        "name": "Indiana Jones",
        "email": "indiana.jones@example.com",
        "password": "archaeologyrocks"
    },
    {
        "name": "Juliet Capulet",
        "email": "juliet.capulet@example.com",
        "password": "romeoandjuliet"
    },
    {
        "name": "Kevin McCallister",
        "email": "kevin.mccallister@example.com",
        "password": "homealonehero"
    },
    {
        "name": "Lara Croft",
        "email": "lara.croft@example.com",
        "password": "tombraiderlegend"
    },
    {
        "name": "Mario Plumber",
        "email": "mario.plumber@example.com",
        "password": "supermariobros"
    },
    {
        "name": "Natalie Portman",
        "email": "natalie.portman@example.com",
        "password": "starwarsqueen"
    },
    {
        "name": "Oliver Twist",
        "email": "oliver.twist@example.com",
        "password": "please_sir_more"
    },
    {
        "name": "Pocahontas Smith",
        "email": "pocahontas.smith@example.com",
        "password": "colors_of_the_wind"
    },
    {
        "name": "Quentin Tarantino",
        "email": "quentin.tarantino@example.com",
        "password": "pulpfictiondirector"
    },
    {
        "name": "Rachel Green",
        "email": "rachel.green@example.com",
        "password": "the_one_with_rachel"
    },
    {
        "name": "Sherlock Holmes",
        "email": "sherlock.holmes@example.com",
        "password": "elementary_my_dear"
    },
    {
        "name": "Trinity Matrix",
        "email": "trinity.matrix@example.com",
        "password": "follow_the_white_rabbit"
    }
];

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

const seedContestData = async () => {
    try {
        // Contests
        await Contests.deleteMany({});
        console.log('Existing contest data cleared.');
        await Contests.insertMany(contestData);
        console.log('contest data seeded successfully!');


        // leaderboard
        await Leaderboard.deleteMany({});
        console.log('Existing leaderboard data cleared.');
        await Leaderboard.insertMany(leaderboardData);
        console.log('leaderboard data seeded successfully!');


        // questions
        await Question.deleteMany({});
        console.log('Existing questions data cleared.');
        await Question.insertMany(questionsData);
        console.log('Questions data seeded successfully!');

        // submissions
        await Submission.deleteMany({});
        console.log('Existing Sumbission data cleared.');
        await Submission.insertMany(submissionData);
        console.log('Sumbission data seeded successfully!');

        // users
        await User.deleteMany({});
        console.log('Existing data cleared.');
        await User.insertMany(usersData);
        console.log('Users data seeded successfully!');

        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding contest data ', error);
        mongoose.connection.close();
    }
};

seedContestData();
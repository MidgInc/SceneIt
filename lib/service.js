export function getHello() {
  return { message: "Hello from the API!" };
}

export function getLessons() {
  return [
    { id: 1, title: "Intro to Math" },
    { id: 2, title: "Intro to Science" },
    { id: 3, title: "Intro to History" },
  ];
}

export function getLesson(id) {
  const lessons = getLessons();
  return lessons.find(l => l.id === Number(id)) || null;
}
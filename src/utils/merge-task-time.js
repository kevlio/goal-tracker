// import dayjs from "dayjs";
// import duration from "dayjs/plugin/duration";
// dayjs.extend(duration);

export function mergeTasksTimeSessions(tasks, timeSessions) {
  const mergedTaskSessions = tasks.map((task) => {
    const filterSessions = timeSessions.filter((session) => {
      return session.taskId === task.id;
    });
    const taskTimesSessions = filterSessions.map((session) => {
      const duration = session.duration.split(":");
      // var x = dayjs(session.startDate);
      // var y = dayjs(session.stopDate);
      // const { hours, minutes, seconds } = dayjs.duration(y.diff(x))["$d"];
      return {
        ...session,
        // hours,
        // minutes,
        // seconds,
        hours: Number(duration[0]),
        minutes: Number(duration[1]),
        seconds: Number(duration[2]),
      };
    });
    const reduceTime = () => {
      if (taskTimesSessions) {
        const hours = taskTimesSessions.reduce(
          (total, session) => session.hours + total,
          0
        );
        const minutes = taskTimesSessions.reduce(
          (total, session) => session.minutes + total,
          0
        );
        const seconds = taskTimesSessions.reduce(
          (total, session) => session.seconds + total,
          0
        );
        return { hours, minutes, seconds };
      }
    };
    const sum = reduceTime();
    return {
      ...task,
      sessions: taskTimesSessions,
      total: sum,
    };
  });
  return mergedTaskSessions;
}

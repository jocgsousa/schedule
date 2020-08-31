import {
  startOfHour, parseISO, endOfToday, endOfDay, subHours, addHours, format, addDays, isAfter,
} from 'date-fns';
import pt from 'date-fns/locale/pt';

import Appointment from '../models/Appointment';

class AppointmentController {
  async store(request, response) {
    const now = startOfHour(new Date());

    const checkDateExists = await Appointment.findAndCountAll();

    // //////////////////////////REGISTRO INICIAL///////////////////////////////
    if (checkDateExists.count <= 0) {
      // Sábado

      if (format(new Date(), 'EEEE', { locale: pt }) === 'sábado') {
        // const { date } = await Appointment.findOne({
        //   where: {
        //     canceled_at: null,
        //   },
        //   order: [['id', 'DESC']],
        // });
        const date = startOfHour(new Date());
        const endDay = endOfDay(subHours(date, 3));
        const dayIncremented = startOfHour(addHours(endDay, 7));
        const newDay = format(dayIncremented, 'EEEE', { locale: pt });
        const appointment = await Appointment.create({
          day: newDay,
          date: dayIncremented,
          user_id: request.userId,
        });
        return response.json(appointment);
      }
      // Domingo
      if (format(new Date(), 'EEEE', { locale: pt }) === 'domingo') {
        // const { date } = await Appointment.findOne({
        //   where: {
        //     canceled_at: null,
        //   },
        //   order: [['id', 'DESC']],
        // });
        const date = startOfHour(new Date());
        const endDay = endOfDay(subHours(date, 3));
        const dayIncremented = startOfHour(addHours(endDay, 7));
        const newDay = format(dayIncremented, 'EEEE', { locale: pt });
        const appointment = await Appointment.create({
          day: newDay,
          date: dayIncremented,
          user_id: request.userId,
        });
        return response.json(appointment);
      }
      //   Se não for sábado e nem domingo

      const date = startOfHour(new Date());
      const endDay = endOfDay(subHours(date, 3));
      const dayIncremented = startOfHour(addHours(endDay, 7));
      const newDay = format(dayIncremented, 'EEEE', { locale: pt });
      const appointment = await Appointment.create({
        day: newDay,
        date: dayIncremented,
        user_id: request.userId,
      });
      return response.json(appointment);
    }
    // /////////////////////////////////////////////////////////////////////////

    // //////////////////////////APÓS O PRIMEIRO REGISTRO///////////////////////
    if (checkDateExists.count >= 1) {
      const { date } = await Appointment.findOne({
        where: {
          canceled_at: null,
        },
        order: [['id', 'DESC']],
      });

      // Dados necessários para salt de dias

      //   const dayNow = format(date, 'EEEE', { locale: pt });

      //   if (dayNow === 'sábado') {
      //     const dia = addDays(date, 2);
      //     const endDay = endOfDay(subHours(dia, 3));
      //     const dayIncremented = addHours(endDay, 7);
      //     const newDay = format(dayIncremented, 'EEEE', { locale: pt });
      //     const appointment = await Appointment.create({
      //       day: newDay,
      //       date: dayIncremented,
      //       user_id: request.userId,
      //     });
      //     return response.json(appointment);
      //   }

      const dia = startOfHour(date);
      const dayIncremented = addHours(dia, 1);
      const newDay = format(dayIncremented, 'EEEE', { locale: pt });

      // Verifica se já avançou expediente
      const endDay = endOfDay(dayIncremented);
      //   Foi subtraído 9h para padronizar o horário de término de expediente que ficará 17h
      const endExpediente = subHours(endDay, 9);
      //   Padroniza o horário para 17:00:00
      const finalExpediente = startOfHour(endExpediente);
      //   Preparando um horário de adiantamento de um dia
      const nextDate = addDays(date, 1);
      //   Condiconal que verifica se o hr incrementado será maior que o final de expediente
      if (isAfter(dayIncremented, finalExpediente)) {
        //   Verificamos se o ultimo registro parar este dia sexta!
        if (format(dayIncremented, 'EEEE', { locale: pt }) === 'sexta-feira') {
          const nextDia = addDays(date, 2);
          const nextEndDay = endOfDay(subHours(nextDia, 3));
          const nextDayIncremented = addHours(startOfHour(nextEndDay), 7);
          const newStringDay = format(nextDayIncremented, 'EEEE', { locale: pt });
          const appointment = await Appointment.create({
            day: newStringDay,
            date: nextDayIncremented,
            user_id: request.userId,
          });
          return response.json(appointment);
        }
        const nextDay = subHours(nextDate, 8);
        const nextStringDay = format(nextDay, 'EEEE', { locale: pt });
        const appointment = await Appointment.create({
          day: nextStringDay,
          date: nextDay,
          user_id: request.userId,
        });
        return response.json(appointment);
      }

      const appointment = await Appointment.create({
        day: newDay,
        date: dayIncremented,
        user_id: request.userId,
      });
      return response.json(appointment);
    }
    // /////////////////////////////////////////////////////////////////////////

    return response.json(now);
  }
}
export default new AppointmentController();

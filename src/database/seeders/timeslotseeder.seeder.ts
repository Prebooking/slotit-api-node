import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { TimeSlot } from 'src/time-slots/entities/time-slot.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TimeSlotSeeder implements Seeder {
  constructor(
    @InjectRepository(TimeSlot)
    private timeSlotRepository: Repository<TimeSlot>,
  ) {}
  async seed(): Promise<any> {
    const intervals: string[] = this.generateTimeIntervals(
      '00:00',
      '23:45',
      15,
    );

    for (const time of intervals) {
      const timeSlotExists = await this.timeSlotRepository.findOneBy({
        time_from: time,
      });
      // console.log(time)
      // console.log(timeSlotExists)
      if (!timeSlotExists) {
        const timeSlot = this.timeSlotRepository.create({ time_from: time });
        await this.timeSlotRepository.save(timeSlot);
      }
    }

    console.log(`Seeded ${intervals.length} time slots.`);
  }

  private generateTimeIntervals(
    start: string,
    end: string,
    intervalMinutes: number,
  ): string[] {
    const times: string[] = [];
    let [hours, minutes] = start.split(':').map(Number);
    const [endHours, endMinutes] = end.split(':').map(Number);

    while (hours < endHours || (hours === endHours && minutes <= endMinutes)) {
      const formattedTime = `${String(hours).padStart(2, '0')}:${String(
        minutes,
      ).padStart(2, '0')}`;
      times.push(formattedTime);

      minutes += intervalMinutes;
      if (minutes >= 60) {
        minutes -= 60;
        hours += 1;
      }
    }

    return times;
  }

  async drop(): Promise<any> {
    // Drop data
  }
}

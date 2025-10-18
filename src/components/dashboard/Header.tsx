import { Speedometer } from './Speedometer';
import { RideStats } from './RideStats';

type HeaderProps = {
  speed: number;
  distance: number;
  time: number;
  elevation: number;
};

export function Header({ speed, distance, time, elevation }: HeaderProps) {
  return (
    <header className="p-4 bg-transparent">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Speedometer speed={speed} />
        </div>
        <div className="lg:col-span-3">
          <RideStats distance={distance} time={time} elevation={elevation} />
        </div>
      </div>
    </header>
  );
}

---
spec_id: admin/davis-instruments-vantage-pro-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Davis Instruments Vantage Pro Series Control Spec"
manufacturer: "Davis Instruments"
model_family: "Vantage Pro"
aliases: []
compatible_with:
  manufacturers:
    - "Davis Instruments"
  models:
    - "Vantage Pro"
    - "Vantage Pro2"
    - "Vantage Vue"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - davis.cz
source_urls:
  - http://www.davis.cz/download/VantageSerialProtocolDocs_v261.pdf
retrieved_at: 2026-08-02T22:04:05.538Z
last_checked_at: 2026-08-05T08:16:19.281Z
generated_at: 2026-08-05T08:16:19.281Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "console hardware voltage/current/power specs not in this document"
  - "WeatherLink data logger USB/serial adapter details not in this document"
  - "exact ASCII termination handling per-console variant (LF vs CR) — source says VP2 needs ONE of LF or CR but NOT both; older VP code mixing both fails intermittently"
  - "flow control not stated in source"
  - "HTTP auth via user/pass query params (credentials not stated - operator-supplied account)"
  - "structured per-variable feedback shape (LOOP/HILOWS/EEPROM block field layout) documented in source Sections X-XIII but too large to inline; reference source for byte maps"
  - "full EEPROM variable map (calibration, alarms, units, station list) - see source Sections XIII-XV"
  - "none - no async push events documented"
  - "no hardware interlock or power-sequencing safety warnings in source beyond above"
  - "hardware electrical specs (voltage, current, power) not in this document"
  - "WeatherLink data logger USB/serial adapter pinout not in this document"
  - "serial flow control not stated in source"
  - "weatherlink.com account credentials / token format operator-supplied, not in source"
  - "Vantage Pro2 vs Vue ISS transmit interval formula referenced as image [412x114] omitted from source text"
  - "full EEPROM graph-data layout for VP (Section XV part 2) and VP2/Vue — extensive, not inlined"
verification:
  verdict: verified
  checked_at: 2026-08-05T08:16:19.281Z
  matched_actions: 41
  action_count: 41
  confidence: medium
  summary: "All 41 spec action wire literals found verbatim in source command catalogue; transport parameters (19200 baud, 8N1, weatherlink.com/webdl.php) confirmed; 1.0 coverage ratio. (15 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-03
---

# Davis Instruments Vantage Pro Series Control Spec

## Summary
Serial communication protocol between Davis Instruments Vantage Pro, Vantage Pro2, and Vantage Vue consoles (or Envoys) and a PC via a WeatherLink Standard Data Logger. Primarily ASCII command strings over RS-232; archive records also retrievable via HTTP GET from weatherlink.com. Covers current data polling (LOOP/LOOP2), high/low retrieval (HILOWS), archive download (DMP/DMPAFT), EEPROM read/write, calibration, clearing, and configuration commands.

<!-- UNRESOLVED: console hardware voltage/current/power specs not in this document -->
<!-- UNRESOLVED: WeatherLink data logger USB/serial adapter details not in this document -->
<!-- UNRESOLVED: exact ASCII termination handling per-console variant (LF vs CR) — source says VP2 needs ONE of LF or CR but NOT both; older VP code mixing both fails intermittently -->

## Transport
```yaml
protocols:
  - serial
  - http
serial:
  baud_rate: 19200  # default; user-selectable: 1200, 2400, 4800, 9600, 14400, 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
  # Note: source also specifies "1 start bit" (standard for async serial)
addressing:
  base_url: "http://weatherlink.com/webdl.php"  # web download endpoint; no "www." subdomain
  # UNRESOLVED: HTTP auth via user/pass query params (credentials not stated - operator-supplied account)
auth:
  type: none  # inferred: no serial login procedure in source; HTTP uses account credentials in URL query string
```

## Traits
```yaml
# - queryable      # LOOP/LPS/HILOWS/GETTIME/VER/NVER/RXCHECK/RECEIVERS/BARDATA/GETEE/EERD/EEBRD/CALED all return data
# - levelable      # BAUD, SETPER, BAR=, SETTIME, calibration offsets set scalar parameters
# - powerable      # inferred: no power command present - LAMPS is closest (console lamp on/off)
traits:
  - queryable
  - levelable
```

## Actions
```yaml
# All commands terminated by single LF (0x0A) OR single CR (0x0D) - NOT both. VP2 requires this strictly.
# Console must be woken (send LF, await \n\r) before sending any command. See Notes.

# ---- 1. Testing commands ----
- id: test
  label: Test
  kind: action
  command: "TEST"
  params: []

- id: wrd_station_type
  label: Read Station Type (WRD)
  kind: query
  command: "WRD\x12\x4D"  # WRD followed by bytes 0x12 0x4D
  params: []

- id: rxcheck
  label: Console Diagnostics Report
  kind: query
  command: "RXCHECK"
  params: []

- id: rxtest
  label: Exit Receiving-From Screen
  kind: action
  command: "RXTEST"
  params: []

- id: ver
  label: Firmware Date Code
  kind: query
  command: "VER"
  params: []

- id: receivers
  label: Received Station ID Bitmap
  kind: query
  command: "RECEIVERS"
  params: []

- id: nver
  label: Firmware Version Number
  kind: query
  command: "NVER"
  params: []  # VP2 fw 1.90+ and Vue only

# ---- 2. Current Data commands ----
- id: loop
  label: Request LOOP Packets
  kind: query
  command: "LOOP {count}"
  params:
    - name: count
      type: integer
      description: Number of LOOP packets to send (decimal); one packet every 2 seconds

- id: lps
  label: Request Typed LOOP Packets
  kind: query
  command: "LPS {mask} {count}"
  params:
    - name: mask
      type: integer
      description: Loop packet type bitmask (hex per source); bit0=LOOP, bit1=LOOP2
    - name: count
      type: integer
      description: Total number of packets to send (decimal)

- id: hilows
  label: High/Low Data Block
  kind: query
  command: "HILOWS"
  params: []  # returns 436-byte block + 2-byte CRC

- id: putrain
  label: Set Yearly Rainfall
  kind: action
  command: "PUTRAIN {yearly_rain_clicks}"
  params:
    - name: yearly_rain_clicks
      type: integer
      description: Yearly rain in rain clicks (decimal)

- id: putet
  label: Set Yearly ET
  kind: action
  command: "PUTET {yearly_et}"
  params:
    - name: yearly_et
      type: integer
      description: Yearly ET in 100th inch (decimal)

# ---- 3. Download commands ----
- id: dmp
  label: Download Entire Archive
  kind: query
  command: "DMP"
  params: []

- id: dmpaft
  label: Download Archive After Timestamp
  kind: query
  command: "DMPAFT"
  params: []  # after ACK, send 2-byte vantageDateStamp + 2-byte vantageTimeStamp + 2-byte CRC

# ---- 4. EEPROM commands ----
- id: getee
  label: Read Full EEPROM
  kind: query
  command: "GETEE"
  params: []  # 4096-byte block + 2-byte CRC

- id: eerd
  label: EEPROM Read (text)
  kind: query
  command: "EERD {address} {bytes}"
  params:
    - name: address
      type: integer
      description: EE address (hex)
    - name: bytes
      type: integer
      description: Number of bytes to read (hex)

- id: eewr
  label: EEPROM Write One Byte (text)
  kind: action
  command: "EEWR {address} {data}"
  params:
    - name: address
      type: integer
      description: EE address (hex)
    - name: data
      type: integer
      description: One byte of EE data (hex)

- id: eebrd
  label: EEPROM Binary Read
  kind: query
  command: "EEBRD {address} {bytes}"
  params:
    - name: address
      type: integer
      description: EE address (hex)
    - name: bytes
      type: integer
      description: Number of bytes to read (hex)

- id: eebwr
  label: EEPROM Binary Write
  kind: action
  command: "EEBWR {address} {bytes}"
  params:
    - name: address
      type: integer
      description: EE address (hex)
    - name: bytes
      type: integer
      description: Number of bytes to write (hex); binary data + CRC follow ACK

# ---- 5. Calibration commands ----
- id: caled
  label: Read Calibrated Sensor Values
  kind: query
  command: "CALED"
  params: []  # 43-byte data block + 2-byte CRC

- id: calfix
  label: Apply Calibration Update
  kind: action
  command: "CALFIX"
  params: []  # send 43 bytes of raw sensor values + 2-byte CRC after ACK

- id: bar_set
  label: Set Barometer/Elevation
  kind: action
  command: "BAR={bar_value} {elevation}"
  params:
    - name: bar_value
      type: integer
      description: Bar value to display (in Hg * 1000), decimal; 0 to clear offset; 20000..32500 if non-zero
    - name: elevation
      type: integer
      description: Elevation in feet (decimal); range -2000..15000

- id: bardata
  label: Read Barometer Calibration
  kind: query
  command: "BARDATA"
  params: []

# ---- 6. Clearing commands ----
- id: clrlog
  label: Clear Archive Data
  kind: action
  command: "CLRLOG"
  params: []

- id: clralm
  label: Clear Alarm Thresholds
  kind: action
  command: "CLRALM"
  params: []  # wait for DONE before next command

- id: clrcal
  label: Clear Temp/Hum Calibration
  kind: action
  command: "CLRCAL"
  params: []  # wait for DONE

- id: clrgra
  label: Clear Graph Points
  kind: action
  command: "CLRGRA"
  params: []  # wait for DONE

- id: clrvar
  label: Clear Rain/ET Variable
  kind: action
  command: "CLRVAR {variable}"
  params:
    - name: variable
      type: integer
      description: Data variable number (decimal); 13=DailyRain,14=StormRain,16=MonthRain,17=YearRain,25=MonthET,26=DayET,27=YearET

- id: clrhights
  label: Clear High Values
  kind: action
  command: "CLRHIGHS {period}"
  params:
    - name: period
      type: integer
      description: "0=daily, 1=monthly, 2=yearly"

- id: clrlows
  label: Clear Low Values
  kind: action
  command: "CLRLOWS {period}"
  params:
    - name: period
      type: integer
      description: "0=daily, 1=monthly, 2=yearly"

- id: clrbits
  label: Clear Active Alarm Bits
  kind: action
  command: "CLRBITS"
  params: []

- id: clrdata
  label: Clear Current Data to Dashes
  kind: action
  command: "CLRDATA"
  params: []

# ---- 7. Configuration commands ----
- id: baud
  label: Set Baud Rate
  kind: action
  command: "BAUD {rate}"
  params:
    - name: rate
      type: integer
      description: "New baud rate (decimal); valid: 1200, 2400, 4800, 9600, 14400, 19200"

- id: settime
  label: Set Console Time
  kind: action
  command: "SETTIME"
  params: []  # send 6 bytes (sec,min,hour24,day,month,year-1900) + 2-byte CRC after ACK

- id: gettime
  label: Get Console Time
  kind: query
  command: "GETTIME"
  params: []

- id: gain
  label: Set Radio Receiver Gain
  kind: action
  command: "GAIN {state}"
  params:
    - name: state
      type: integer
      description: "'0' off, '1' on (VP only - NOT VP2/Vue)"

- id: setper
  label: Set Archive Interval
  kind: action
  command: "SETPER {minutes}"
  params:
    - name: minutes
      type: integer
      description: "Archive interval in minutes (decimal); valid: 1, 5, 10, 15, 30, 60, 120"

- id: stop
  label: Halt Archive Recording
  kind: action
  command: "STOP"
  params: []

- id: start
  label: Resume Archive Recording
  kind: action
  command: "START"
  params: []

- id: newsetup
  label: Re-initialize Console
  kind: action
  command: "NEWSETUP"
  params: []  # MUST issue after changing lat/long, setup bits, rain collector, or transmitter config

- id: lamps
  label: Set Console Lamps
  kind: action
  command: "LAMPS {state}"
  params:
    - name: state
      type: integer
      description: "'0' off, '1' on"
```

## Feedbacks
```yaml
# Response characters from the console (per Section VII/IX):
- id: ack
  type: enum
  values: ["0x06"]  # ACK - command recognized
- id: nak
  type: enum
  values: ["0x21"]  # NAK - invalid command parameters
- id: cancel
  type: enum
  values: ["0x18"]  # CANCEL - bad CRC on received block
- id: ok_response
  type: literal
  values: ["\\n\\rOK\\n\\r"]
- id: done_response
  type: literal
  values: ["DONE\\n\\r"]  # long-running command completion
- id: wakeup_ack
  type: literal
  values: ["\\n\\r"]  # console awake response to LF wakeup
# UNRESOLVED: structured per-variable feedback shape (LOOP/HILOWS/EEPROM block field layout) documented in source Sections X-XIII but too large to inline; reference source for byte maps
```

## Variables
```yaml
# Settable parameters exposed via dedicated commands. EEPROM-mapped settings
# (calibration offsets, alarm thresholds, unit bits, station list, graph pointers)
# are read/written through EERD/EEWR/EEBRD/EEBWR - see source Sections XIII-XV
# for the full EEPROM address table.
- id: baud_rate
  type: integer
  unit: bps
  range: [1200, 2400, 4800, 9600, 14400, 19200]
- id: archive_interval
  type: integer
  unit: minutes
  range: [1, 5, 10, 15, 30, 60, 120]
- id: yearly_rain
  type: integer
  unit: rain_clicks
- id: yearly_et
  type: integer
  unit: "0.01 inch"
- id: bar_offset
  type: integer
  unit: "in Hg * 1000"
- id: elevation
  type: integer
  unit: feet
  range: [-2000, 15000]
- id: console_time
  type: struct
  description: "6 bytes: sec, min, hour(24), day, month, year-1900"
- id: lamps_state
  type: enum
  values: [off, on]
- id: gain_state
  type: enum
  values: [off, on]  # VP only
# UNRESOLVED: full EEPROM variable map (calibration, alarms, units, station list) - see source Sections XIII-XV
```

## Events
```yaml
# Console emits no unsolicited notifications. All data is solicited via LOOP/LPS
# (one packet every 2.0/2.5 s after request) or via query commands. LOOP packet
# streams are halted by sending a lone <CR>. Console sleeps between LOOP packets.
# UNRESOLVED: none - no async push events documented
```

## Macros
```yaml
# Multi-step procedures explicitly documented in source (Section XIV):
- id: wakeup_console
  description: |
    MUST run before any command. Send LF (0x0A), wait ≤1.2 s for \n\r.
    Retry up to 3 attempts; on failure signal connection error.
    Console stays awake 2 min after each received character (resets on each).
    Exception: LOOP mode - console sleeps between packets.
  steps:
    - send: "\n"
    - wait_for: "\n\r"
    - on_timeout_retry: 3

- id: set_calibration_values
  description: Per source Section XIV.1
  steps:
    - command: "EEBRD 32 2B"      # read current offsets
    - command: "CALED"            # read current calibrated values
    - compute: "uncalibrated = calibrated - offset"
    - command: "EEBWR 32 2B"      # write new offsets
    - command: "CALFIX"           # push uncalibrated values to refresh display

- id: set_rain_collector_type
  description: Per source Section XIV.3
  steps:
    - command: "EEBRD 2B 01"
    - compute: "rain_type = setup_bits & 0x30"
    - compute: "setup_bits = (setup_bits & 0xCF) | new_rain_type"
    - command: "EEBWR 2B 01"
    - command: "NEWSETUP"

- id: set_transmitter_config
  description: Per source Section XIV.4 - MUST end with NEWSETUP
  steps:
    - command: "EEBRD 19 10"
    - write_station_list_via: "EEBWR 19 10"
    - write_via: "EEWR 17 <USETX byte>"
    - command: "NEWSETUP"
```

## Safety
```yaml
confirmation_required_for:
  - clrlog        # destroys entire archive memory
  - clrgra        # destroys all graph history
  - clralm        # clears all alarm thresholds
  - clrcal        # clears all calibration offsets
  - clrdata       # clears all current data
  - clrhights     # clears daily/monthly/yearly highs
  - clrlows       # clears daily/monthly/yearly lows
  - eewr          # raw EEPROM write - can corrupt calibration/station config
  - eebwr         # raw EEPROM binary write
  - setper        # auto-clears archive memory
interlocks:
  - "Console must be woken before sending any command (see wakeup_console macro)."
  - "Console ignores commands while in Setup screens (except 'Receiving From…') or number-entry mode."
  - "Console ignores commands and key presses while a Download is in progress."
  - "Do NOT send commands between an 'OK' and the following 'DONE' for CLRALM/CLRCAL/CLRGRA."
  - "NEWSETUP must be issued after changing latitude/longitude, SETUP_BITS (EEPROM 0x2B), rain collector type, or transmitter ID/retransmit settings."
  - "VP2 commands must be terminated by LF OR CR - not both. Mixed LF+CR causes intermittent failures."
  - "GAIN command is VP-only; issuing on VP2/Vue is unsupported."
  - "EEPROM factory calibration fields (BAR_GAIN, BAR_OFFSET, HUM33, HUM80) MUST NOT be modified."
  - "Use SETPER for ARCHIVE_PERIOD and BAR= for BAR_CAL/ELEVATION rather than direct EEPROM writes."
# UNRESOLVED: no hardware interlock or power-sequencing safety warnings in source beyond above
```

## Notes
- Multi-byte binary values are little-endian (LSB first). Negative numbers use 2's complement. **CRC values are sent MSB first** — opposite of data values.
- CRC algorithm is CRC-CCITT using a 256-entry lookup table (full table in source Section XII). Formula per byte: `crc = crc_table[(crc >> 8) ^ data] ^ (crc << 8)`.
- LOOP packet is 99 bytes (fields in source Section X.1). LOOP2 packet also 99 bytes (Section X.2, VP2 fw 1.90+/Vue only). HILOWS packet is 436 bytes + 2-byte CRC.
- Archive records are 52 bytes; sent in 267-byte pages (5 records + 4 unused bytes + 2-byte CRC). 512 pages = 2560 records total.
- Two archive record formats: Rev "A" (firmware before Apr 24, 2002) and Rev "B" (on/after Apr 24, 2002). Distinguish via byte 42 of record: 0xFF = Rev A, 0x00 = Rev B. Also detectable via VER date.
- LOOP/LPS packet interval: LOOP every 2.0 s, LPS every 2.5 s. Console sleeps between packets; halt early by sending lone `<CR>` (same as wakeup char).
- Web download (HTTP GET to `http://weatherlink.com/webdl.php`): two-step — `action=headers` returns metadata, then `action=data` returns raw 52-byte archive record stream. `timestamp`, `user`, `pass` are query params. Do NOT prefix URL with `www.`.
- Console type byte from WRD: 16 = Vantage Pro/Pro2, 17 = Vantage Vue.
- WRD example payload: literal bytes `0x12 0x4D` after the ASCII `WRD`.
- `CLRVAR` valid variable numbers: 13=DailyRain, 14=StormRain, 16=MonthRain, 17=YearRain, 25=MonthET, 26=DayET, 27=YearET. Others undefined.
- Battery-constrained: console maximizes sleep. Every received character resets the 2-minute wake timer (except in LOOP mode).

<!-- UNRESOLVED: hardware electrical specs (voltage, current, power) not in this document -->
<!-- UNRESOLVED: WeatherLink data logger USB/serial adapter pinout not in this document -->
<!-- UNRESOLVED: serial flow control not stated in source -->
<!-- UNRESOLVED: weatherlink.com account credentials / token format operator-supplied, not in source -->
<!-- UNRESOLVED: Vantage Pro2 vs Vue ISS transmit interval formula referenced as image [412x114] omitted from source text -->
<!-- UNRESOLVED: full EEPROM graph-data layout for VP (Section XV part 2) and VP2/Vue — extensive, not inlined -->
````

## Provenance

```yaml
source_domains:
  - davis.cz
source_urls:
  - http://www.davis.cz/download/VantageSerialProtocolDocs_v261.pdf
retrieved_at: 2026-08-02T22:04:05.538Z
last_checked_at: 2026-08-05T08:16:19.281Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:16:19.281Z
matched_actions: 41
action_count: 41
confidence: medium
summary: "All 41 spec action wire literals found verbatim in source command catalogue; transport parameters (19200 baud, 8N1, weatherlink.com/webdl.php) confirmed; 1.0 coverage ratio. (15 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "console hardware voltage/current/power specs not in this document"
- "WeatherLink data logger USB/serial adapter details not in this document"
- "exact ASCII termination handling per-console variant (LF vs CR) — source says VP2 needs ONE of LF or CR but NOT both; older VP code mixing both fails intermittently"
- "flow control not stated in source"
- "HTTP auth via user/pass query params (credentials not stated - operator-supplied account)"
- "structured per-variable feedback shape (LOOP/HILOWS/EEPROM block field layout) documented in source Sections X-XIII but too large to inline; reference source for byte maps"
- "full EEPROM variable map (calibration, alarms, units, station list) - see source Sections XIII-XV"
- "none - no async push events documented"
- "no hardware interlock or power-sequencing safety warnings in source beyond above"
- "hardware electrical specs (voltage, current, power) not in this document"
- "WeatherLink data logger USB/serial adapter pinout not in this document"
- "serial flow control not stated in source"
- "weatherlink.com account credentials / token format operator-supplied, not in source"
- "Vantage Pro2 vs Vue ISS transmit interval formula referenced as image [412x114] omitted from source text"
- "full EEPROM graph-data layout for VP (Section XV part 2) and VP2/Vue — extensive, not inlined"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0

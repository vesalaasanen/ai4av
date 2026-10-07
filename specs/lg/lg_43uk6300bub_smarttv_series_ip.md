---
spec_id: admin/lg-43uk6300bub-smarttv-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 43UK6300BUB SmartTV Series Control Spec"
manufacturer: LG
model_family: 43UK6300BUB
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 43UK6300BUB
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - proaudioinc.com
source_urls:
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
retrieved_at: 2026-09-26T14:23:15.527Z
last_checked_at: 2026-09-26T14:23:15.527Z
generated_at: 2026-09-26T14:23:15.527Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source applicability inferred: the manufacturer protocol document names no model; commands verified against it but not confirmed for this exact model"
verification:
  verdict: verified
  checked_at: 2026-09-26T14:23:15.527Z
  matched_actions: 26
  action_count: 26
  confidence: high
  summary: "All 26 eligible families match; serial/IP encoding, full key inventories, generic model scope and source contradictions remain explicit."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-17
---

# LG 43UK6300BUB SmartTV Series Control Spec

## Summary
Generic LG TV External Control Device Setup command catalog. Applicability to 43UK6300BUB is inferred from manufacturer and display class; exact model and firmware support are not stated. Serial 9600/8/N/1 and US-only Telnet/TCP 9761 are described. Features, port variants, 3D, RGB-PC inputs and key availability remain model-dependent. Plasma-only ISM is excluded;26 conditional function families remain.

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 9761
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null
  encoding: ascii
auth:
  type: unknown
  notes: UNRESOLVED session authentication; 828 is a local IP setup-menu password.
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: power
  label: Power
  kind: action
  command: ka {set_id} {data_hex}\r
  params:
    - name: set_id
      type: string
      description: 'Serial only: two ASCII hex digits 00..63; menu IDs 1..99, 00 broadcasts.'
    - name: data_hex
      type: string
      description: Serial ASCII hexadecimal. 00=off, 01=on.
      values:
        - "00"
        - "01"
  protocol: serial and tcp
  rs232_command:
    - k
    - a
  ip_command: POWER off
  notes: Serial supports off/on and FF status. IP documents only POWER off, no POWER on or POWER query. IP power-on is WOL after Mobile TV On; WOL packet details are not supplied.
- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  command: kc {set_id} {data_hex}\r
  params:
    - name: set_id
      type: string
      description: 'Serial only: two ASCII hex digits 00..63; menu IDs 1..99, 00 broadcasts.'
    - name: data_hex
      type: string
      description: Serial ASCII hexadecimal. 01=4:3,02=16:9,04=Zoom,05=Zoom2,06=Original,07=14:9,09=Just Scan,0B=Full Wide,0C=21:9,10..1F=Cinema Zoom1..16.
      values:
        - "01"
        - "02"
        - "04"
        - "05"
        - "06"
        - "07"
        - "09"
        - "0B"
        - "0C"
        - "10"
        - "11"
        - "12"
        - "13"
        - "14"
        - "15"
        - "16"
        - "17"
        - "18"
        - "19"
        - "1A"
        - "1B"
        - "1C"
        - "1D"
        - "1E"
        - "1F"
    - name: ip_mode
      type: string
      values:
        - 4by3
        - 16by9
        - setbyoriginal
  protocol: serial and tcp
  rs232_command:
    - k
    - c
  ip_command: ASPECT_RATIO {ip_mode}
  notes: 'Serial 05 is Latin America except Colombia only. 07/0B: Europe, Colombia, Mid-East, Asia except South Korea/Japan. 0C model-dependent. PC input only 4:3/16:9; Just Scan requires high-definition DTV/HDMI/Component; Full Wide varies by model/signal.'
- id: screen_mute
  label: Screen Mute
  kind: action
  command: kd {set_id} {data_hex}\r
  params:
    - name: set_id
      type: string
      description: 'Serial only: two ASCII hex digits 00..63; menu IDs 1..99, 00 broadcasts.'
    - name: data_hex
      type: string
      description: Serial ASCII hexadecimal. 00=all mute off,01=screen mute on,10=video mute on.
      values:
        - "00"
        - "01"
        - "10"
    - name: ip_mode
      type: string
      values:
        - screenmuteon
        - videomuteon
        - allmuteoff
  protocol: serial and tcp
  rs232_command:
    - k
    - d
  ip_command: SCREEN_MUTE {ip_mode}
  notes: Video mute retains OSD; screen mute hides OSD.
- id: volume_mute
  label: Volume Mute
  kind: action
  command: ke {set_id} {data_hex}\r
  params:
    - name: set_id
      type: string
      description: 'Serial only: two ASCII hex digits 00..63; menu IDs 1..99, 00 broadcasts.'
    - name: data_hex
      type: string
      description: Serial ASCII hexadecimal. 00=mute on (sound off),01=mute off (sound on).
      values:
        - "00"
        - "01"
    - name: ip_state
      type: string
      values:
        - 'on'
        - 'off'
  protocol: serial and tcp
  rs232_command:
    - k
    - e
  ip_command: VOLUME_MUTE {ip_state}
- id: volume_control
  label: Volume
  kind: action
  command: kf {set_id} {level_hex}\r
  params:
    - name: set_id
      type: string
      description: 'Serial only: two ASCII hex digits 00..63; menu IDs 1..99, 00 broadcasts.'
    - name: level_hex
      type: string
      description: 'Serial only: two ASCII hex digits 00..64, representing decimal 0..100.'
    - name: level
      type: integer
      range:
        - 0
        - 100
      description: 'IP only: decimal digits, not hexadecimal.'
  protocol: serial and tcp
  rs232_command:
    - k
    - f
  ip_command: VOLUME_CONTROL {level}
  notes: Both encodings describe the same numeric range; convert the number to hex only for serial.
  numeric_range:
    - 0
    - 100
- id: contrast
  label: Contrast
  kind: action
  command: kg {set_id} {level_hex}\r
  params:
    - name: set_id
      type: string
      description: 'Serial only: two ASCII hex digits 00..63; menu IDs 1..99, 00 broadcasts.'
    - name: level_hex
      type: string
      description: 'Serial only: two ASCII hex digits 00..64, representing decimal 0..100.'
    - name: level
      type: integer
      range:
        - 0
        - 100
      description: 'IP only: decimal digits, not hexadecimal.'
  protocol: serial and tcp
  rs232_command:
    - k
    - g
  ip_command: PICTURE_CONTRAST {level}
  notes: Both encodings describe the same numeric range; convert the number to hex only for serial.
  numeric_range:
    - 0
    - 100
- id: brightness
  label: Brightness
  kind: action
  command: kh {set_id} {level_hex}\r
  params:
    - name: set_id
      type: string
      description: 'Serial only: two ASCII hex digits 00..63; menu IDs 1..99, 00 broadcasts.'
    - name: level_hex
      type: string
      description: 'Serial only: two ASCII hex digits 00..64, representing decimal 0..100.'
    - name: level
      type: integer
      range:
        - 0
        - 100
      description: 'IP only: decimal digits, not hexadecimal.'
  protocol: serial and tcp
  rs232_command:
    - k
    - h
  ip_command: PICTURE_BRIGHTNESS {level}
  notes: Both encodings describe the same numeric range; convert the number to hex only for serial.
  numeric_range:
    - 0
    - 100
- id: color_colour
  label: Color/Colour
  kind: action
  command: ki {set_id} {level_hex}\r
  params:
    - name: set_id
      type: string
      description: 'Serial only: two ASCII hex digits 00..63; menu IDs 1..99, 00 broadcasts.'
    - name: level_hex
      type: string
      description: 'Serial only: two ASCII hex digits 00..64, representing decimal 0..100.'
    - name: level
      type: integer
      range:
        - 0
        - 100
      description: 'IP only: decimal digits, not hexadecimal.'
  protocol: serial and tcp
  rs232_command:
    - k
    - i
  ip_command: PICTURE_COLOUR {level}
  notes: Both encodings describe the same numeric range; convert the number to hex only for serial.
  numeric_range:
    - 0
    - 100
- id: tint
  label: Tint
  kind: action
  command: kj {set_id} {level_hex}\r
  params:
    - name: set_id
      type: string
      description: 'Serial only: two ASCII hex digits 00..63; menu IDs 1..99, 00 broadcasts.'
    - name: level_hex
      type: string
      description: 'Serial only: two ASCII hex digits 00..64, representing decimal 0..100.'
    - name: level
      type: integer
      range:
        - 0
        - 100
      description: 'IP only: decimal digits, not hexadecimal.'
  protocol: serial and tcp
  rs232_command:
    - k
    - j
  ip_command: PICTURE_TINT {level}
  notes: Both encodings describe the same numeric range; convert the number to hex only for serial. Endpoints are Red=0 and Green=100. Tint ACK command byte is j (PDF p8); r is adjacent Treble ACK.
  numeric_range:
    - 0
    - 100
- id: sharpness
  label: Sharpness
  kind: action
  command: kk {set_id} {level_hex}\r
  params:
    - name: set_id
      type: string
      description: 'Serial only: two ASCII hex digits 00..63; menu IDs 1..99, 00 broadcasts.'
    - name: level_hex
      type: string
      description: 'Serial only: two ASCII hex digits 00..32, representing decimal 0..50.'
    - name: level
      type: integer
      range:
        - 0
        - 50
      description: 'IP only: decimal digits, not hexadecimal.'
  protocol: serial and tcp
  rs232_command:
    - k
    - k
  ip_command: PICTURE_SHARPNESS {level}
  notes: Both encodings describe the same numeric range; convert the number to hex only for serial.
  numeric_range:
    - 0
    - 50
- id: osd_select
  label: OSD Select
  kind: action
  command: kl {set_id} {data_hex}\r
  params:
    - name: set_id
      type: string
      description: 'Serial only: two ASCII hex digits 00..63; menu IDs 1..99, 00 broadcasts.'
    - name: data_hex
      type: string
      description: Serial ASCII hexadecimal. 00=off,01=on.
      values:
        - "00"
        - "01"
    - name: ip_state
      type: string
      values:
        - 'on'
        - 'off'
  protocol: serial and tcp
  rs232_command:
    - k
    - l
  ip_command: OSD_SELECT {ip_state}
- id: remote_control_lock
  label: Remote Control Lock
  kind: action
  command: km {set_id} {data_hex}\r
  params:
    - name: set_id
      type: string
      description: 'Serial only: two ASCII hex digits 00..63; menu IDs 1..99, 00 broadcasts.'
    - name: data_hex
      type: string
      description: Serial ASCII hexadecimal. 00=off,01=on.
      values:
        - "00"
        - "01"
    - name: ip_state
      type: string
      values:
        - 'on'
        - 'off'
  protocol: serial and tcp
  rs232_command:
    - k
    - m
  ip_command: REMOTECONTROLER_LOCK {ip_state}
- id: treble
  label: Treble
  kind: action
  command: kr {set_id} {level_hex}\r
  params:
    - name: set_id
      type: string
      description: 'Serial only: two ASCII hex digits 00..63; menu IDs 1..99, 00 broadcasts.'
    - name: level_hex
      type: string
      description: 'Serial only: two ASCII hex digits 00..64, representing decimal 0..100.'
  protocol: serial
  rs232_command:
    - k
    - r
  notes: Serial only; the source gives no corresponding IP treble/bass command. AUDIO_EQUALIZER is a separate function.
  numeric_range:
    - 0
    - 100
- id: bass
  label: Bass
  kind: action
  command: ks {set_id} {level_hex}\r
  params:
    - name: set_id
      type: string
      description: 'Serial only: two ASCII hex digits 00..63; menu IDs 1..99, 00 broadcasts.'
    - name: level_hex
      type: string
      description: 'Serial only: two ASCII hex digits 00..64, representing decimal 0..100.'
  protocol: serial
  rs232_command:
    - k
    - s
  notes: Serial only; the source gives no corresponding IP treble/bass command. AUDIO_EQUALIZER is a separate function.
  numeric_range:
    - 0
    - 100
- id: balance
  label: Balance
  kind: action
  command: kt {set_id} {level_hex}\r
  params:
    - name: set_id
      type: string
      description: 'Serial only: two ASCII hex digits 00..63; menu IDs 1..99, 00 broadcasts.'
    - name: level_hex
      type: string
      description: 'Serial only: two ASCII hex digits 00..64, representing decimal 0..100.'
    - name: level
      type: integer
      range:
        - 0
        - 100
      description: 'IP only: decimal digits, not hexadecimal.'
  protocol: serial and tcp
  rs232_command:
    - k
    - t
  ip_command: AUDIO_BALANCE {level}
  notes: Both encodings describe the same numeric range; convert the number to hex only for serial.
  numeric_range:
    - 0
    - 100
- id: color_temperature
  label: Color Temperature
  kind: action
  command: xu {set_id} {level_hex}\r
  params:
    - name: set_id
      type: string
      description: 'Serial only: two ASCII hex digits 00..63; menu IDs 1..99, 00 broadcasts.'
    - name: level_hex
      type: string
      description: 'Serial only: two ASCII hex digits 00..64, representing decimal 0..100.'
    - name: level
      type: integer
      range:
        - 0
        - 100
      description: 'IP only: decimal digits, not hexadecimal.'
  protocol: serial and tcp
  rs232_command:
    - x
    - u
  ip_command: PICTURE_COLOUR_TEMPERATURE {level}
  notes: Both encodings describe the same numeric range; convert the number to hex only for serial.
  numeric_range:
    - 0
    - 100
- id: equalizer
  label: Equalizer
  kind: action
  command: jv {set_id} {data_hex}\r
  params:
    - name: set_id
      type: string
      description: 'Serial only: two ASCII hex digits 00..63; menu IDs 1..99, 00 broadcasts.'
    - name: band
      type: integer
      range:
        - 1
        - 5
    - name: step
      type: integer
      range:
        - 0
        - 20
    - name: data_hex
      type: string
      description: 'Serial packed byte: bits7..5 encode band-1 (000,001,010,011,100); bits4..0 encode step. Send as two ASCII hex digits. Step20 has a contradictory source bit-row; see Notes.'
  protocol: serial and tcp
  rs232_command:
    - j
    - v
  ip_command: AUDIO_EQUALIZER {band} {step}
  notes: 'Model-dependent. Serial requires an EQ-adjustable sound mode; IP prerequisite: All settings > sound > sound mode settings > Equalizer on. IP step 0..20 is explicit. Serial final step 20 row is internally inconsistent; do not silently resolve it.'
- id: energy_saving
  label: Energy Saving
  kind: action
  command: jq {set_id} {data_hex}\r
  params:
    - name: set_id
      type: string
      description: 'Serial only: two ASCII hex digits 00..63; menu IDs 1..99, 00 broadcasts.'
    - name: data_hex
      type: string
      description: Serial ASCII hexadecimal. 00=Off,01=Minimum,02=Medium,03=Maximum,04=Auto(LCD/LED)/Intelligent sensor(PDP),05=Screen off.
      values:
        - "00"
        - "01"
        - "02"
        - "03"
        - "04"
        - "05"
    - name: ip_mode
      type: string
      values:
        - screenoff
        - maximum
        - medium
        - minimum
        - 'off'
  protocol: serial and tcp
  rs232_command:
    - j
    - q
  ip_command: ENERGY_SAVING {ip_mode}
  notes: Model-dependent; no IP auto mnemonic is documented.
- id: tune_command
  label: Tune Channel
  kind: action
  command: ma {set_id} {channel_bytes}\r
  params:
    - name: set_id
      type: string
      description: 'Serial only: two ASCII hex digits 00..63; menu IDs 1..99, 00 broadcasts.'
    - name: channel_bytes
      type: string
      description: 'Serial only: space-separated three-byte regional or six-byte ATSC/ISDB payload, including final source byte; exact layouts and ranges in Notes.'
    - name: channel
      type: integer
      description: IP analog channel or single major for cablemaj. No independent IP bounds are stated; serial bounds are region-specific.
    - name: major
      type: integer
      description: IP digital major; required with antennanotphy/cablenotphy.
    - name: minor
      type: integer
      description: IP digital minor; required with antennanotphy/cablenotphy.
    - name: analog_source
      type: string
      values:
        - antenna
        - cable
    - name: digital_source
      type: string
      values:
        - antennanotphy
        - cablenotphy
  protocol: serial and tcp
  rs232_command:
    - m
    - a
  ip_command:
    - CHANNEL_SETTING_ATSC_ATV {channel} {analog_source}
    - CHANNEL_SETTING_ATSC_DTV {channel} cablemaj
    - CHANNEL_SETTING_ATSC_DTV {major} {minor} {digital_source}
  notes: Use exactly one regional/transport variant. Serial ma payloads are fully enumerated in Notes. IP forms are USA only; no other source tokens are documented.
- id: channel_add_delete
  label: Channel Add/Delete
  kind: action
  command: mb {set_id} {data_hex}\r
  params:
    - name: set_id
      type: string
      description: 'Serial only: two ASCII hex digits 00..63; menu IDs 1..99, 00 broadcasts.'
    - name: data_hex
      type: string
      description: Serial ASCII hexadecimal. 00=Del(ATSC/ISDB)/Skip(DVB),01=Add.
      values:
        - "00"
        - "01"
    - name: ip_operation
      type: string
      values:
        - add
        - delete
  protocol: serial and tcp
  rs232_command:
    - m
    - b
  ip_command: CHANNEL_ADD_DELETE {ip_operation}
  notes: Operates on current saved channel.
- id: key
  label: Remote Key
  kind: action
  command: mc {set_id} {key_code}\r
  params:
    - name: set_id
      type: string
      description: 'Serial only: two ASCII hex digits 00..63; menu IDs 1..99, 00 broadcasts.'
    - name: key_code
      type: string
      values:
        - "00"
        - "01"
        - "02"
        - "03"
        - "06"
        - "07"
        - "08"
        - "09"
        - "0B"
        - "0E"
        - "0F"
        - "10"
        - "11"
        - "12"
        - "13"
        - "14"
        - "15"
        - "16"
        - "17"
        - "18"
        - "19"
        - "1A"
        - "1E"
        - "20"
        - "21"
        - "28"
        - "30"
        - "39"
        - "40"
        - "41"
        - "42"
        - "43"
        - "44"
        - "45"
        - "4C"
        - "4D"
        - "52"
        - "53"
        - "5B"
        - "60"
        - "61"
        - "63"
        - "71"
        - "72"
        - "79"
        - "91"
        - "9E"
        - "7A"
        - "7C"
        - "7E"
        - "8E"
        - "8F"
        - "AA"
        - "AB"
        - "B0"
        - "B1"
        - "B5"
        - "BA"
        - "BB"
        - "BD"
        - "DC"
        - "99"
        - "9F"
        - "9B"
      description: Serial ASCII hex key; complete mapping in Notes.
    - name: ip_key
      type: string
      values:
        - exit
        - channelup
        - channeldown
        - volumeup
        - volumedown
        - arrowright
        - arrowleft
        - volumemute
        - deviceinput
        - sleepreserve
        - livetv
        - previouschannel
        - favoritechannel
        - teletext
        - teletextoption
        - returnback
        - avmode
        - captionsubtitle
        - arrowup
        - arrowdown
        - myapp
        - settingmenu
        - ok
        - quickmenu
        - videomode
        - audiomode
        - channellist
        - bluebutton
        - yellowbutton
        - greenbutton
        - redbutton
        - aspectratio
        - audiodescription
        - programmorder
        - userguide
        - smarthome
        - simplelink
        - fastforward
        - rewind
        - programminfo
        - programguide
        - play
        - slowplay
        - soccerscreen
        - record
        - 3d
        - autoconfig
        - app
        - screenbright
        - number0
        - number1
        - number2
        - number3
        - number4
        - number5
        - number6
        - number7
        - number8
        - number9
  protocol: serial and tcp
  rs232_command:
    - m
    - c
  ip_command: KEY_ACTION {ip_key}
  notes: 'Availability depends on model. Serial4C only ATSC/ISDB major/minor models: South Korea, Japan, North America, Latin America except Colombia. No 1:1 mapping between the two independent key inventories is assumed.'
- id: backlight
  label: Backlight/Panel Light
  kind: action
  command: mg {set_id} {level_hex}\r
  params:
    - name: set_id
      type: string
      description: 'Serial only: two ASCII hex digits 00..63; menu IDs 1..99, 00 broadcasts.'
    - name: level_hex
      type: string
      description: 'Serial only: two ASCII hex digits 00..64, representing decimal 0..100.'
    - name: level
      type: integer
      range:
        - 0
        - 100
      description: 'IP only: decimal digits, not hexadecimal.'
  protocol: serial and tcp
  rs232_command:
    - m
    - g
  ip_command: PICTURE_BACKLIGHT {level}
  notes: 'Both encodings describe the same numeric range; convert the number to hex only for serial. Serial mg controls LCD/LED backlight or Plasma panel light. IP prerequisite: All settings > picture > Energy Saving off.'
  numeric_range:
    - 0
    - 100
- id: input_select
  label: Input Select
  kind: action
  command: xb {set_id} {data_hex}\r
  params:
    - name: set_id
      type: string
      description: 'Serial only: two ASCII hex digits 00..63; menu IDs 1..99, 00 broadcasts.'
    - name: data_hex
      type: string
      description: Serial ASCII hexadecimal. 00=DTV; 01=CADTV; 02=Satellite DTV / ISDB-BS(Japan); 03=ISDB-CS1(Japan); 04=ISDB-CS2(Japan); 10=ATV; 11=CATV; 20=AV/AV1; 21=AV2; 40=Component1; 41=Component2; 60=RGB; 90=HDMI1; 91=HDMI2; 92=HDMI3; 93=HDMI4
      values:
        - "00"
        - "01"
        - "02"
        - "03"
        - "04"
        - "10"
        - "11"
        - "20"
        - "21"
        - "40"
        - "41"
        - "60"
        - "90"
        - "91"
        - "92"
        - "93"
    - name: ip_source
      type: string
      values:
        - dtv
        - atv
        - cadtv
        - catv
        - avav1
        - component1
        - hdmi1
        - hdmi2
        - hdmi3
  protocol: serial and tcp
  rs232_command:
    - x
    - b
  ip_command: INPUT_SELECT {ip_source}
  notes: Model/signal-dependent. Do not expose serial-only inputs as IP mnemonics; source gives no IP HDMI4, satellite, AV2, Component2 or RGB token.
- id: picture_3d
  label: 3D Mode
  kind: action
  command: xt {set_id} {mode_hex} {format_hex} {direction_hex} {depth_hex}\r
  params:
    - name: set_id
      type: string
      description: 'Serial only: two ASCII hex digits 00..63; menu IDs 1..99, 00 broadcasts.'
    - name: mode_hex
      type: string
      values:
        - "00"
        - "01"
        - "02"
        - "03"
      description: Serial:00=On,01=Off,02=3D-to-2D,03=2D-to-3D.
    - name: format_hex
      type: string
      values:
        - "00"
        - "01"
        - "02"
        - "03"
        - "04"
        - "05"
      description: 'Serial: top-bottom,side-by-side,checkboard,frame-sequential,column-interleaving,row-interleaving respectively.'
    - name: direction_hex
      type: string
      values:
        - "00"
        - "01"
      description: Serial:00=right-to-left,01=left-to-right.
    - name: depth_hex
      type: string
      description: Serial ASCII hex00..14 (decimal0..20).
    - name: format
      type: string
      values:
        - topandbottom
        - sidebyside
        - checkboard
        - framesequential
        - columninterleaving
        - rowinterleaving
    - name: direction
      type: string
      values:
        - righttoleft
        - lefttoright
    - name: depth
      type: integer
      range:
        - 0
        - 20
  protocol: serial and tcp
  rs232_command:
    - x
    - t
  ip_command:
    - PICTURE_3D off
    - PICTURE_3D 3dto2d
    - PICTURE_3D 2dto3d {direction} {depth}
    - PICTURE_3D on {format} {direction} {depth}
  notes: Only 3D models and supported signals. Serial always transmits four bytes, with unused fields retained as dont-care. Source prose/table disagree about direction/depth relevance; full conflict in Notes. IP on requires format,direction,depth;2dto3d requires direction,depth.
- id: picture_3d_extension
  label: Extended 3D
  kind: action
  command: xv {set_id} {option_hex} {value_hex}\r
  params:
    - name: set_id
      type: string
      description: 'Serial only: two ASCII hex digits 00..63; menu IDs 1..99, 00 broadcasts.'
    - name: option_hex
      type: string
      values:
        - "00"
        - "01"
        - "02"
        - "06"
        - "07"
        - "08"
        - "09"
      description: Serial:00=picturecorrection,01=depth,02=viewpoint,06=colorcorrection,07=sound,08=normal,09=genre.
    - name: value_hex
      type: string
      description: Serial:00/01 for 00,06,07,08;00..14 for 01/02;00..05 for 09.
    - name: option
      type: string
      values:
        - picturecorrection
        - colorcorrection
        - sound
        - normal
        - depth
        - viewpoint
        - genre
    - name: value
      type: integer
      description: IP:0/1 for picturecorrection,colorcorrection,sound,normal;0..20 for depth/viewpoint;0..5 for genre.
  protocol: serial and tcp
  rs232_command:
    - x
    - v
  ip_command: PICTURE_3D_EXTENSION {option} {value}
  notes: Only 3D models. Serial and IP preconditions differ; exact prerequisites and value meanings in Notes.
- id: auto_configure
  label: Auto Configure
  kind: action
  command: ju {set_id} 01\r
  params:
    - name: set_id
      type: string
      description: 'Serial only: two ASCII hex digits 00..63; menu IDs 1..99, 00 broadcasts.'
  protocol: serial and tcp
  rs232_command:
    - j
    - u
  ip_command: KEY_ACTION autoconfig
  notes: RGB(PC) mode only; conditional on model/input.
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values:
    - "00"
    - "01"
  description: 00=PowerOff, 01=PowerOn Serial only; expand opcode/data tokens with Set ID and CR framing.
  query_command:
    - k
    - a
    - "FF"
  protocol: serial
  notes: Serial ka FF read only; ACK a<SP>SetID<SP>OKDatax,00=off,01=on. No IP power query documented.
- id: volume_mute_state
  type: enum
  values:
    - "00"
    - "01"
  description: 00=MuteOn, 01=MuteOff Serial only; expand opcode/data tokens with Set ID and CR framing.
  query_command:
    - k
    - e
    - "FF"
  protocol: serial
- id: volume_level
  type: integer
  range:
    - 0
    - 100
  query_command:
    - k
    - f
    - "FF"
  protocol: serial
  description: ' Serial only; expand opcode/data tokens with Set ID and CR framing.'
  notes: Decode ASCII hex response to decimal; wire00..64 means0..100.
- id: contrast_level
  type: integer
  range:
    - 0
    - 100
  query_command:
    - k
    - g
    - "FF"
  protocol: serial
  description: ' Serial only; expand opcode/data tokens with Set ID and CR framing.'
  notes: Decode ASCII hex response to decimal; wire00..64 means0..100.
- id: brightness_level
  type: integer
  range:
    - 0
    - 100
  query_command:
    - k
    - h
    - "FF"
  protocol: serial
  description: ' Serial only; expand opcode/data tokens with Set ID and CR framing.'
  notes: Decode ASCII hex response to decimal; wire00..64 means0..100.
- id: color_level
  type: integer
  range:
    - 0
    - 100
  query_command:
    - k
    - i
    - "FF"
  protocol: serial
  description: ' Serial only; expand opcode/data tokens with Set ID and CR framing.'
  notes: Decode ASCII hex response to decimal; wire00..64 means0..100.
- id: tint_level
  type: integer
  range:
    - 0
    - 100
  query_command:
    - k
    - j
    - "FF"
  protocol: serial
  description: ' Serial only; expand opcode/data tokens with Set ID and CR framing.'
  notes: Decode ASCII hex response to decimal; wire00..64 means0..100.
- id: sharpness_level
  type: integer
  range:
    - 0
    - 50
  query_command:
    - k
    - k
    - "FF"
  protocol: serial
  description: ' Serial only; expand opcode/data tokens with Set ID and CR framing.'
  notes: Decode ASCII hex response to decimal; wire00..32 means0..50.
- id: osd_state
  type: enum
  values:
    - "00"
    - "01"
  query_command:
    - k
    - l
    - "FF"
  protocol: serial
  description: ' Serial only; expand opcode/data tokens with Set ID and CR framing.'
- id: remote_lock_state
  type: enum
  values:
    - "00"
    - "01"
  query_command:
    - k
    - m
    - "FF"
  protocol: serial
  description: ' Serial only; expand opcode/data tokens with Set ID and CR framing.'
- id: treble_level
  type: integer
  range:
    - 0
    - 100
  query_command:
    - k
    - r
    - "FF"
  protocol: serial
  description: ' Serial only; expand opcode/data tokens with Set ID and CR framing.'
  notes: Decode ASCII hex response to decimal; wire00..64 means0..100.
- id: bass_level
  type: integer
  range:
    - 0
    - 100
  query_command:
    - k
    - s
    - "FF"
  protocol: serial
  description: ' Serial only; expand opcode/data tokens with Set ID and CR framing.'
  notes: Decode ASCII hex response to decimal; wire00..64 means0..100.
- id: balance_level
  type: integer
  range:
    - 0
    - 100
  query_command:
    - k
    - t
    - "FF"
  protocol: serial
  description: ' Serial only; expand opcode/data tokens with Set ID and CR framing.'
  notes: Decode ASCII hex response to decimal; wire00..64 means0..100.
- id: color_temperature_level
  type: integer
  range:
    - 0
    - 100
  query_command:
    - x
    - u
    - "FF"
  protocol: serial
  description: ' Serial only; expand opcode/data tokens with Set ID and CR framing.'
  notes: Decode ASCII hex response to decimal; wire00..64 means0..100.
- id: energy_saving_mode
  type: enum
  values:
    - "00"
    - "01"
    - "02"
    - "03"
    - "04"
    - "05"
  query_command:
    - j
    - q
    - "FF"
  protocol: serial
  description: ' Serial only; expand opcode/data tokens with Set ID and CR framing.'
- id: input_source
  type: enum
  values:
    - "00"
    - "01"
    - "02"
    - "03"
    - "04"
    - "10"
    - "11"
    - "20"
    - "21"
    - "40"
    - "41"
    - "60"
    - "90"
    - "91"
    - "92"
    - "93"
  query_command:
    - x
    - b
    - "FF"
  protocol: serial
  description: ' Serial only; expand opcode/data tokens with Set ID and CR framing.'
- id: ack_response
  type: enum
  values:
    - OK
    - NG
  description: 'Acknowledgement response format: [Command2][ ][SetID][ ][OK/NG][Data][x]'
  protocol: serial
  notes: 'Serial only: Command2<SP>SetID<SP>OKDatax or Command2<SP>SetID<SP>NGDatax. NG00=Illegal Code.'
- id: error_code
  type: enum
  values:
    - "00"
  description: Error code 00 = Illegal Code
- id: ip_acknowledgement
  type: enum
  values:
    - OK
    - NG
  protocol: tcp
  description: Network command success/failure text; exact reply terminator bytes not stated.
```

## Variables
```yaml
# No separate entries documented.
```

## Events
```yaml
# No separate entries documented.
```

## Macros
```yaml
# No separate entries documented.
```

## Safety
```yaml
interlocks:
  - During media playback/recording only Power and Key execute.
  - Key lock blocks IR/local power-on in standby; mains recycle releases it after20–30seconds.
  - IP backlight requires Energy Saving off; IP equalizer requires Equalizer on.
  - 3D requires a supporting3D model; auto-configure requires RGB(PC).
confirmation_required_for: []
```

## Notes

### Scope and setup

- Source: generic LG **External Control Device Setup**, printed pages1–16; exact target models and firmware are not named. Same-manufacturer display applicability is inferred. Every feature, input, port type and key is conditional on the actual model. 3D, RGB-PC and Plasma-only functions are not promised for an LCD/LED target.
- Network IP Control is **USA only** in this source. On Live TV, hold Settings at least 5 seconds, wait for the banner, enter default828 and OK, then enable Network IP Control in IP Control Setup and accept the reboot. The local three-digit menu password is changeable;828 is not a Telnet session credential. Serial and IP session authentication remain UNRESOLVED.
- Connect via Telnet/TCP 9761 after setup, on wired or wireless network. Source instructs pressing Enter; exact IP command/reply terminator bytes are UNRESOLVED. Do not infer them from serial CR/x framing. Successful IP commands return OK, rejected ones NG. `quit` closes the session. Blank Enter returning NG can also establish connection.
- Only `POWER off` is documented over IP. IP power-on uses WOL after enabling Settings > Mobile TV On; this guide does not define WOL packet bytes. There is no documented parameterless POWER query.
- Serial uses9600/8/N/1 ASCII with a crossed cable; flow control is not stated. DE9/phone-jack/USB availability varies by model. USB converter:PL2303, VID0x0557/PID0x2008. USB-to-serial control requires TV on; RS232 cable allows ka while on or off.

### Serial framing, data and responses

- Action parameters are transport-specific alternatives: use serial fields only with `command`, and IP fields only with `ip_command`. Arrays of IP commands are documented alternative request forms, not a sequence to execute.
- Request `[Command1][Command2]<SP>[SetID]<SP>[Data]<CR>`;SP=0x20,CR=0x0D. Commands above show `\r` as an escape for that CR byte, not two literal backslash/r bytes.
- Menu Set ID1..99 is encoded as hex01..63 on the wire;00 broadcasts. Every serial data byte is two ASCII hexadecimal digits. Numeric metadata uses decimal:00..64hex means0..100, and sharpness00..32hex means0..50. IP uses decimal strings for those same numbers. For example volume50 is `kf 01 32<CR>` vs `VOLUME_CONTROL 50`.
- Read status with FF for documented readable functions. Feedback `query_command` arrays are opcode/data tokens; expand them with SetID and framing, e.g.[k,f,FF] means `kf {set_id} FF<CR>`. No serial ACK or FF read syntax applies to IP.
- Serial OK:`[Command2]<SP>[SetID]<SP>OK[Data]x`;NG:`[Command2]<SP>[SetID]<SP>NG[Data]x`. Literal reply terminator x=0x78. Successful writes echo data; reads return status. NG data00=Illegal Code. Tint ACK is j; Treble ACK is r, verified in PDF p8's two columns.
- Multi-byte ma/xt/xv OK replies contain their transmitted data fields; their NG replies contain Data00 only, then x. Serial ma is region-dependent as below.
- During media playback/recording, all functions except Power(ka) and Key(mc) are rejected NG. Lock km blocks IR/local-key power-on in standby; removing/reapplying main power releases lock after20–30seconds. Backlight IP requires Energy Saving off; EQ IP requires Equalizer on.

### Regional serial tuning and IP variants

For Europe, Mid-East, Colombia, Asia except South Korea/Japan, serial ma data is `channel_hi channel_lo source`. Analog channel0..199 (0000..00C7):source00=antenna,80=cable. Digital channel0..9999 (0000..270F):10=DTV antenna,20=antenna radio,40=satellite TV,50=satellite radio,90=cable TV,A0=cable radio.

For South Korea, North/Latin America except Colombia, serial ma data is `physical major_hi major_lo minor_hi minor_lo source`. Analog antenna physical02..45hex (2..69),source00;analog cable01 or0E..7Dhex (1 or14..125),source01;major/minor are don't-care. Digital major0001..270F (1..9999);minor occupies two bytes but no tighter numeric bound is stated. Digital source02=antenna using physical,06=cable using physical,22=antenna without physical,26=cable without physical,46=cable physical/major only (one-part),66=cable major only (one-part). Populate meaningful fields for the selected variant; don't-care examples use00. The introductory statement calls digital physical unnecessary, but02/06/46 variants explicitly use it; retain the variant distinction.

Japan uses the same six-byte payload. Physical is don't-care;major0001..270F;minor/branch is two bytes and don't-care for satellite. Source02=ISDB-T antenna,07=BS,08=CS1,09=CS2. Do not relabel Japan02 as ATSC. The transmission diagram displays SetID0; all examples use00 broadcast.

Literal source examples, each followed by serial CR:
- Europe analog10:`ma 00 00 0a 00`.
- Europe digital1:`ma 00 00 01 10`.
- Satellite1000:`ma 00 03 E8 40`.
- NTSC cable35:`ma 00 23 00 00 00 00 01`.
- ATSC30-3:`ma 00 00 00 1E 00 03 22`.
- Japan17-1:`ma 00 00 00 11 00 01 02`.
- JapanBS30:`ma 00 00 00 1E 00 00 07`.

US IP forms are exactly `CHANNEL_SETTING_ATSC_ATV {channel} antenna|cable`, `CHANNEL_SETTING_ATSC_DTV {channel} cablemaj`, and `CHANNEL_SETTING_ATSC_DTV {major} {minor} antennanotphy|cablenotphy`. The pipe notation here means alternatives, not literal wire characters. No other regional IP forms are established.

### Equalizer and 3D source limitations

Serial EQ jv packs band-1 into bits7..5 and step into bits4..0. **UNRESOLVED source inconsistency:** PDF p9 labels the last step 20(decimal), but prints low bits10101 (binary21). Do not treat that last bit-row as an unambiguous serial code. The IP AUDIO_EQUALIZER band 1..5 and step 0..20 ranges are explicit. This is separate from serial-only treble kr and bass ks.

Serial 3D xt sends all four bytes. Mode00=on,01=off,02=3Dto2D,03=2Dto3D;format00..05 and direction00/01 are enumerated above;depth00..14hex is decimal0..20. **UNRESOLVED internal conflict:** p11 prose says depth has no meaning for mode00, but its relevance table marks it O; prose says direction has no meaning for mode03, while the table marks it O. Another sentence conditions depth for 00/03 on manual3D genre. Mode01/02 marks all remaining bytes don't-care. Keep all four bytes and do not claim a resolved relevance/default rule. IP syntax is explicit and requires all shown arguments for on and2dto3d.

Extended 3D serial xv:
- Option00 picture correction:00=right-to-left,01=left-to-right.
- Options01 depth/02 viewpoint:00..14hex (0..20);viewpoint maps to-10..+10, model-dependent. Source requires manual genre for these serial options.
- Options06 color correction/07 sound zoom:00=off,01=on.
- Option08 normal view:00=revert to3D from3Dto2D;01=convert3D to2D except2Dto3D video;invalid conversion state returns NG.
- Option09 genre:00=Standard,01=Sport,02=Cinema,03=Extreme,04=Manual,05=Auto.

Extended 3D IP:
- picturecorrection0/1=right-to-left/left-to-right;requires `PICTURE_3D on ...`.
- colorcorrection,sound,normal0/1=off/on per IP table;each requires `PICTURE_3D on ...`. Do not borrow serial option08's phrasing as a different IP boolean mapping.
- depth0..20 requires `PICTURE_3D 2dto3d ...` then `PICTURE_3D_EXTENSION genre 4`.
- viewpoint0..20 requires `PICTURE_3D 2dto3d ...`;the IP table does not also require genre4 here, unlike the serial prose.
- genre0..5 uses Standard,Sport,Cinema,Extreme,Manual,Auto and requires `PICTURE_3D 2dto3d ...`.

### Complete serial key parameters (page 2)

| Hex | Function |
| --- | --- |
| 00 | CH+/PR+ |
| 01 | CH-/PR- |
| 02 | Volume+ |
| 03 | Volume- |
| 06 | Right |
| 07 | Left |
| 08 | Power |
| 09 | Mute |
| 0B | Input |
| 0E | Sleep |
| 0F | TV/TV-RAD |
| 10 | Number0 |
| 11 | Number1 |
| 12 | Number2 |
| 13 | Number3 |
| 14 | Number4 |
| 15 | Number5 |
| 16 | Number6 |
| 17 | Number7 |
| 18 | Number8 |
| 19 | Number9 |
| 1A | Q.View/Flashback |
| 1E | Favorite |
| 20 | Teletext |
| 21 | Teletext option |
| 28 | Return/Back |
| 30 | AV mode |
| 39 | Caption/subtitle |
| 40 | Up |
| 41 | Down |
| 42 | My Apps |
| 43 | Menu/Settings |
| 44 | OK/Enter |
| 45 | Q.Menu |
| 4C | List/- (major/minor models) |
| 4D | Picture |
| 52 | Sound |
| 53 | List |
| 5B | Exit |
| 60 | PIP(AD) |
| 61 | Blue |
| 63 | Yellow |
| 71 | Green |
| 72 | Red |
| 79 | Ratio/Aspect |
| 91 | Audio Description |
| 9E | Live Menu |
| 7A | User Guide |
| 7C | Smart/Home |
| 7E | SIMPLINK |
| 8E | Forward |
| 8F | Rewind |
| AA | Info |
| AB | Program Guide |
| B0 | Play |
| B1 | Stop/File List |
| B5 | Recent |
| BA | Freeze/Slow Play/Pause |
| BB | Soccer |
| BD | Record |
| DC | 3D |
| 99 | AutoConfig |
| 9F | App/* |
| 9B | TV/PC |

The separate IP key parameter list is fully enumerated in the key action. Entries such as `programmorder`, `simplelink`, and `screenbright` retain the source spelling. No extra commands are inferred from their names.

## Provenance

```yaml
source_domains:
  - proaudioinc.com
source_urls:
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
retrieved_at: 2026-09-26T14:23:15.527Z
last_checked_at: 2026-09-26T14:23:15.527Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-26T14:23:15.527Z
matched_actions: 26
action_count: 26
confidence: high
summary: "All 26 eligible families match; serial/IP encoding, full key inventories, generic model scope and source contradictions remain explicit."
```

## Known Gaps

```yaml
- "source applicability inferred: the manufacturer protocol document names no model; commands verified against it but not confirmed for this exact model"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0

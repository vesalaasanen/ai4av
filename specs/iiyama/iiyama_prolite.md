---
spec_id: admin/iiyama-prolite-companion
schema_version: ai4av-public-spec-v1
revision: 1
title: "Iiyama ProLite LHxx54 Series RS-232 Control Spec"
manufacturer: Iiyama
model_family: "ProLite LH3254HS-B1AG"
aliases: []
compatible_with:
  manufacturers:
    - Iiyama
  models:
    - "ProLite LH3254HS-B1AG"
    - "ProLite LH4354UHS-B1AG"
    - "ProLite LH5054UHS-B1AG"
    - "ProLite LH5554UHS-B1AG"
    - "ProLite LH6554UHS-B1AG"
    - "ProLite LH7554UHS-B1AG"
    - "ProLite LH8654UHS-B1AG"
    - "ProLite LH9854UHS-B1AG"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cdn.iiyama.com
source_urls:
  - https://cdn.iiyama.com/f/dcee9a0889b9f1e85fd5ac0fa77eaf96_lhxx54-rs232-lan-commands-improved-2023-08.pdf
retrieved_at: 2026-07-14T03:17:47.544Z
last_checked_at: 2026-08-19T09:26:12.836Z
generated_at: 2026-08-19T09:26:12.836Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "per-model feature variation not enumerated beyond the OSD availability caveat; firmware versions not stated"
  - "no unsolicited event packets documented in source"
  - "no multi-step sequences described in source"
  - "source contains no safety warnings or interlock procedures beyond the \"do not send a"
  - "document revision history lists revisions up to V3.2 (2019-10-31); exact document version stamp attached to this scan not stated."
verification:
  verdict: verified
  checked_at: 2026-08-19T09:26:12.836Z
  matched_actions: 34
  action_count: 34
  confidence: medium
  summary: "All 34 spec actions match source opcodes, parameter shapes, and transport values verbatim; source documents no additional host-sent command codes beyond these 34. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-16
---

# Iiyama ProLite LHxx54 Series RS-232 Control Spec

## Summary
RS-232 / LAN control protocol for Iiyama LHxx54 ProLite large-format displays. Binary framed packets over serial (9600 8N1, DB9) or LAN TCP port 5000. Covers power, input source, video/audio parameters, scheduling, language, pixel shift, lock state, and cold-start behaviour.

<!-- UNRESOLVED: per-model feature variation not enumerated beyond the OSD availability caveat; firmware versions not stated -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 5000
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred from power set/get commands (0x18, 0x19)
- routable   # inferred from input source set/get commands (0xAC, 0xAD)
- queryable  # inferred from explicit Get variants of every command
- levelable  # inferred from volume / brightness / color / audio parameter commands
```

## Actions
```yaml
# Frame structure (from source §2.3):
# Header(0xA6) | MonitorID(1..255, 0=broadcast) | Category(0x00) | Page(0x00) |
# Code1 | Length(N+3) | DataControl(0x01) | Data[0..N] | Checksum(XOR of bytes 1..N excluding checksum)
# Report header is 0x21. TCP port 5000 carries the same bytes.
# Variable parts shown as {param}; checksum must be computed per packet.

# --- 3.1 Platform & version ---
- id: get_platform_version_labels
  label: Get Platform and Version Labels
  kind: query
  command: "A6 {monitor_id} 00 00 00 04 01 A2 {label} {checksum}"
  params:
    - name: monitor_id
      type: integer
      description: Display address 1..255
    - name: label
      type: hex_byte
      description: "0x00=OTSC version, 0x01=platform label, 0x02=platform version"

- id: get_model_fw_builddate
  label: Get Model Number / FW Version / Build Date
  kind: query
  command: "A6 {monitor_id} 00 00 00 04 01 A1 {code} {checksum}"
  params:
    - name: monitor_id
      type: integer
      description: Display address 1..255
    - name: code
      type: hex_byte
      description: "0x00=Model Number, 0x01=FW version, 0x02=Build Date"

# --- 4.1 Power ---
- id: get_power_state
  label: Get Power State
  kind: query
  command: "A6 01 00 00 00 03 01 19 BC"  # example for ID=1
  params: []

- id: set_power_state
  label: Set Power State
  kind: action
  command: "A6 {monitor_id} 00 00 00 04 01 18 {state} {checksum}"
  params:
    - name: monitor_id
      type: integer
      description: Display address 1..255
    - name: state
      type: hex_byte
      description: "0x01=Power Off, 0x02=On"

# --- 4.2 IR remote lock ---
- id: get_ir_lock_state
  label: Get IR Remote Lock State
  kind: query
  command: "A6 {monitor_id} 00 00 00 03 01 1D {checksum}"
  params:
    - name: monitor_id
      type: integer
      description: Display address 1..255

- id: set_ir_lock_state
  label: Set IR Remote Lock State
  kind: action
  command: "A6 {monitor_id} 00 00 00 04 01 1C {mode} {checksum}"
  params:
    - name: monitor_id
      type: integer
      description: Display address 1..255
    - name: mode
      type: hex_byte
      description: "0x01=Unlock all, 0x02=Lock all, 0x03=Lock all but Power, 0x04=Lock all but Volume, 0x05=Primary(Master), 0x06=Secondary(Daisy chain), 0x07=Lock all except Power&Volume"

# --- 4.2 Keypad lock ---
- id: get_keypad_lock_state
  label: Get Keypad Lock State
  kind: query
  command: "A6 {monitor_id} 00 00 00 03 01 1B {checksum}"
  params:
    - name: monitor_id
      type: integer
      description: Display address 1..255

- id: set_keypad_lock_state
  label: Set Keypad Lock State
  kind: action
  command: "A6 {monitor_id} 00 00 00 04 01 1A {mode} {checksum}"
  params:
    - name: monitor_id
      type: integer
      description: Display address 1..255
    - name: mode
      type: hex_byte
      description: "0x01=Unlock all, 0x02=Lock all, 0x03=Lock all but Power, 0x04=Lock all but Volume, 0x07=Lock all except Power&Volume"

# --- 4.3 Cold start power state ---
- id: get_power_at_cold_start
  label: Get Power at Cold Start
  kind: query
  command: "A6 {monitor_id} 00 00 00 03 01 A4 {checksum}"
  params:
    - name: monitor_id
      type: integer
      description: Display address 1..255

- id: set_power_at_cold_start
  label: Set Power at Cold Start
  kind: action
  command: "A6 {monitor_id} 00 00 00 04 01 A3 {mode} {checksum}"
  params:
    - name: monitor_id
      type: integer
      description: Display address 1..255
    - name: mode
      type: hex_byte
      description: "0x00=Power Off, 0x01=Forced On, 0x02=Last Status"

# --- 5.1 Input source set ---
- id: set_input_source
  label: Set Input Source
  kind: action
  command: "A6 {monitor_id} 00 00 00 07 01 AC {source} 00 00 00 {checksum}"
  params:
    - name: monitor_id
      type: integer
      description: Display address 1..255
    - name: source
      type: hex_byte
      description: "0x01=VIDEO, 0x02=S-VIDEO, 0x03=COMPONENT, 0x04=CVI2(NA), 0x05=VGA, 0x06=HDMI2, 0x07=DP2, 0x08=USB2, 0x09=DVI-D card, 0x0A=DP1, 0x0B=OPS, 0x0C=USB1, 0x0D=HDMI, 0x0E=DVI-D, 0x0F=HDMI3, 0x10=BROWSER, 0x11=SMARTCMS, 0x12=DMS, 0x13=INTERNAL STORAGE, 0x14/0x15=Reserved, 0x16=Media Player, 0x17=PDF Player, 0x18=Custom, 0x19=HDMI4"

# --- 5.2 Current source ---
- id: get_current_source
  label: Get Current Source
  kind: query
  command: "A6 {monitor_id} 00 00 00 03 01 AD {checksum}"
  params:
    - name: monitor_id
      type: integer
      description: Display address 1..255

# --- 6.1.1 / 6.1.3 Video parameters ---
- id: get_video_parameters
  label: Get Video Parameters
  kind: query
  command: "A6 {monitor_id} 00 00 00 03 01 33 {checksum}"
  params:
    - name: monitor_id
      type: integer
      description: Display address 1..255

- id: set_video_parameters
  label: Set Video Parameters
  kind: action
  command: "A6 {monitor_id} 00 00 00 0A 01 32 {brightness} {color} {contrast} {sharpness} {tint} {black_level} {gamma} {checksum}"
  params:
    - name: monitor_id
      type: integer
      description: Display address 1..255
    - name: brightness
      type: hex_byte
      description: 0..100 (%) mapped to 0x00..0x64
    - name: color
      type: hex_byte
      description: 0..100 (%)
    - name: contrast
      type: hex_byte
      description: 0..100 (%)
    - name: sharpness
      type: hex_byte
      description: 0..100 (%)
    - name: tint
      type: hex_byte
      description: 0..100 (%)
    - name: black_level
      type: hex_byte
      description: 0..100 (%)
    - name: gamma
      type: hex_byte
      description: "0x01=Native, 0x02=S gamma, 0x03=2.2, 0x04=2.4, 0x05=D-image(DICOM)"

# --- 6.1.4 / 6.1.6 Color temperature ---
- id: get_color_temperature
  label: Get Color Temperature
  kind: query
  command: "A6 {monitor_id} 00 00 00 03 01 35 {checksum}"
  params:
    - name: monitor_id
      type: integer
      description: Display address 1..255

- id: set_color_temperature
  label: Set Color Temperature
  kind: action
  command: "A6 {monitor_id} 00 00 00 04 01 34 {ct} {checksum}"
  params:
    - name: monitor_id
      type: integer
      description: Display address 1..255
    - name: ct
      type: hex_byte
      description: "0x00=User1, 0x01=Native, 0x03=10000K, 0x04=9300K, 0x05=7500K, 0x06=6500K, 0x09=5000K, 0x0A=4000K, 0x0D=3000K, 0x12=User2 (others Not applicable)"

# --- 6.1.7 / 6.1.8 Color parameters (gain/offset) ---
- id: get_color_parameters
  label: Get Color Parameters  kind: query
  command: "A6 {monitor_id} 00 00 00 03 01 37 {checksum}"
  params:
    - name: monitor_id
      type: integer
      description: Display address 1..255

- id: set_color_parameters
  label: Set Color Parameters
  kind: action
  command: "A6 {monitor_id} 00 00 00 09 01 36 {r_gain} {g_gain} {b_gain} {r_off} {g_off} {b_off} {checksum}"
  params:
    - name: monitor_id
      type: integer
      description: Display address 1..255
    - name: r_gain
      type: hex_byte
      description: Red gain 0..255
    - name: g_gain
      type: hex_byte
      description: Green gain 0..255
    - name: b_gain
      type: hex_byte
      description: Blue gain 0..255
    - name: r_off
      type: hex_byte
      description: Red offset 0..255
    - name: g_off
      type: hex_byte
      description: Green offset 0..255
    - name: b_off
      type: hex_byte
      description: Blue offset 0..255

# --- 6.2 Picture format ---
- id: get_picture_format
  label: Get Picture Format
  kind: query
  command: "A6 {monitor_id} 00 00 00 03 01 3B {checksum}"
  params:
    - name: monitor_id
      type: integer
      description: Display address 1..255

- id: set_picture_format
  label: Set Picture Format
  kind: action
  command: "A6 {monitor_id} 00 00 00 04 01 3A {fmt} {checksum}"
  params:
    - name: monitor_id
      type: integer
      description: Display address 1..255
    - name: fmt
      type: hex_byte
      description: "low nibble: 0x00=Normal(4:3), 0x01=Custom, 0x02=Real(1:1), 0x03=Full, 0x04=21:9, 0x05=Dynamic(DSXX6QBK unsupported), 0x06=16:9"

# --- 7.1 Volume ---
- id: get_volume
  label: Get Volume
  kind: query
  command: "A6 {monitor_id} 00 00 00 03 01 45 {checksum}"
  params:
    - name: monitor_id
      type: integer
      description: Display address 1..255

- id: set_volume
  label: Set Volume (speaker + audio out)
  kind: action
  command: "A6 {monitor_id} 00 00 00 05 01 44 {volume} {audio_out} {checksum}"
  params:
    - name: monitor_id
      type: integer
      description: Display address 1..255
    - name: volume
      type: hex_byte
      description: Speaker volume 0..100 (%)
    - name: audio_out
      type: hex_byte
      description: Audio out volume 0..100 (%);0 does not overwrite system mute

# --- 7.2 Volume limits ---
- id: set_volume_limits
  label: Set Volume Limits
  kind: action
  command: "A6 {monitor_id} 00 00 00 06 01 B8 {min} {max} {switch_on} {checksum}"
  params:
    - name: monitor_id
      type: integer
      description: Display address 1..255
    - name: min
      type: hex_byte
      description: Minimum volume 0..100 (%)
    - name: max
      type: hex_byte
      description: Maximum volume 0..100 (%)
    - name: switch_on
      type: hex_byte
      description: Switch-on volume 0..100 (%); must satisfy Min <= SwitchOn <= Max

# --- 7.3 Audio parameters ---
- id: get_audio_parameters
  label: Get Audio Parameters (Treble, Bass)
  kind: query
  command: "A6 {monitor_id} 00 00 00 03 01 43 {checksum}"
  params:
    - name: monitor_id
      type: integer
      description: Display address 1..255

- id: set_audio_parameters
  label: Set Audio Parameters (Treble, Bass)
  kind: action
  command: "A6 {monitor_id} 00 00 00 05 01 42 {treble} {bass} {checksum}"
  params:
    - name: monitor_id
      type: integer
      description: Display address 1..255
    - name: treble
      type: hex_byte
      description: Treble 0..10 (0x00..0x0A)
    - name: bass
      type: hex_byte
      description: Bass 0..10 (0x00..0x0A)

# --- 8.1 Operating hours ---
- id: get_operating_hours
  label: Get Operating Hours
  kind: query
  command: "A6 {monitor_id} 00 00 00 04 01 0F 02 {checksum}"
  params:
    - name: monitor_id
      type: integer
      description: Display address 1..255
  notes: Response DATA[1..2] = MSB/LSB of 16-bit hours counter.

# --- 8.2 Auto adjust (VGA) ---
- id: video_auto_adjust
  label: VGA Video Auto Adjust
  kind: action
  command: "A6 {monitor_id} 00 00 00 05 01 70 40 00 {checksum}"
  params:
    - name: monitor_id
      type: integer
      description: Display address 1..255

# --- 8.3 Serial code ---
- id: get_serial_code
  label: Get Serial Code (14-char production code)
  kind: query
  command: "A6 {monitor_id} 00 00 00 03 01 15 {checksum}"
  params:
    - name: monitor_id
      type: integer
      description: Display address 1..255

# --- 9 Scheduling ---
- id: get_scheduling_parameters
  label: Get Scheduling Parameters
  kind: query
  command: "A6 {monitor_id} 00 00 00 04 01 5B {page} {checksum}"
  params:
    - name: monitor_id
      type: integer
      description: Display address 1..255
    - name: page
      type: hex_byte
      description: Scheduling page 1..7

- id: set_scheduling_parameters
  label: Set Scheduling Parameters
  kind: action
  command: "A6 {monitor_id} 00 00 00 0B 01 5A {page_ctrl} {start_h} {start_m} {end_h} {end_m} {video_src} {workday_bits} {bookmark_tag} {checksum}"
  params:
    - name: monitor_id
      type: integer
      description: Display address 1..255
    - name: page_ctrl
      type: hex_byte
      description: "high nibble=page 1..7, low nibble=0 disable / 1 enable"
    - name: start_h
      type: hex_byte
      description: Start hour 0..23 (24=NULL)
    - name: start_m
      type: hex_byte
      description: Start minute 0..59 (60=NULL)
    - name: end_h
      type: hex_byte
      description: End hour 0..23 (24=NULL)
    - name: end_m
      type: hex_byte
      description: End minute 0..59 (60=NULL)
    - name: video_src
      type: hex_byte
      description: "Input source enum (same as set_input_source)"
    - name: workday_bits
      type: hex_byte
      description: "bit0=every week, bit1=Mon..bit7=Sun"
    - name: bookmark_tag
      type: hex_byte
      description: "0x00=none, 0x01..0x07=Tag1..7 (1..7 required for Media Player / Browser / PDF)"

# --- 10 Language ---
- id: get_language
  label: Get Language
  kind: query
  command: "A6 {monitor_id} 00 00 00 03 01 C0 {checksum}"
  params:
    - name: monitor_id
      type: integer
      description: Display address 1..255

- id: set_language
  label: Set Language
  kind: action
  command: "A6 {monitor_id} 00 00 00 04 01 C1 {lang} {checksum}"
  params:
    - name: monitor_id
      type: integer
      description: Display address 1..255
    - name: lang
      type: hex_byte
      description: "0x00=EN, 0x01=DE, 0x02=ZH-CN, 0x03=FR, 0x04=IT, 0x05=ES, 0x06=RU, 0x07=PL, 0x08=TR, 0x09=ZH-TW, 0x0A=JA, 0x0B=PT, 0x0C=AR, 0x0D=DA, 0x0E=SV, 0x0F=FI, 0x10=NO, 0x11=NL"

# --- 11 Pixel shift ---
- id: get_pixel_shift
  label: Get Pixel Shift
  kind: query
  command: "A6 {monitor_id} 00 00 00 03 01 B1 {checksum}"
  params:
    - name: monitor_id
      type: integer
      description: Display address 1..255

- id: set_pixel_shift
  label: Set Pixel Shift
  kind: action
  command: "A6 {monitor_id} 00 00 00 04 01 B2 {secs} {checksum}"
  params:
    - name: monitor_id
      type: integer
      description: Display address 1..255
    - name: secs
      type: hex_byte
      description: "0x00=Off, 0x01=10s, 0x02=20s, 0x03=30s, 0x04=40s..0x5A=900s, 0x5B=AUTO"
```

## Feedbacks
```yaml
# Each Get yields a 0x21-prefixed Report packet. Fields below mirror the source.
- id: power_state
  type: enum
  values: [off, on]
- id: ir_lock_state
  type: enum
  values: [unlock_all, lock_all, lock_all_but_power, lock_all_but_volume, primary_master, secondary_daisy, lock_all_except_power_and_volume]
- id: keypad_lock_state
  type: enum
  values: [unlock_all, lock_all, lock_all_but_power, lock_all_but_volume, lock_all_except_power_and_volume]
- id: power_at_cold_start
  type: enum
  values: [power_off, forced_on, last_status]
- id: current_source
  type: enum
  values: [video, svideo, component, cvi2, vga, hdmi2, dp2, usb2, dvi_d_card, dp1, ops, usb1, hdmi, dvi_d, hdmi3, browser, smartcms, dms, internal_storage, reserved_14, reserved_15, media_player, pdf_player, custom, hdmi4]
- id: video_parameters
  type: object
  fields:
    brightness: {type: integer, range: [0, 100]}
    color: {type: integer, range: [0, 100]}
    contrast: {type: integer, range: [0, 100]}
    sharpness: {type: integer, range: [0, 100]}
    tint: {type: integer, range: [0, 100]}
    black_level: {type: integer, range: [0, 100]}
    gamma: {type: enum, values: [native, s_gamma, g22, g24, d_image_dicom]}
- id: color_temperature
  type: enum
  values: [user1, native, c10000k, c9300k, c7500k, c6500k, c5000k, c4000k, c3000k, user2]
- id: color_parameters
  type: object
  fields:
    r_gain: {type: integer, range: [0, 255]}
    g_gain: {type: integer, range: [0, 255]}
    b_gain: {type: integer, range: [0, 255]}
    r_offset: {type: integer, range: [0, 255]}
    g_offset: {type: integer, range: [0, 255]}
    b_offset: {type: integer, range: [0, 255]}
- id: picture_format
  type: enum
  values: [normal_4_3, custom, real_1_1, full, c21_9, dynamic, c16_9]
- id: volume
  type: object
  fields:
    speaker: {type: integer, range: [0, 100]}
    audio_out: {type: integer, range: [0, 100]}
- id: audio_parameters
  type: object
  fields:
    treble: {type: integer, range: [0, 10]}
    bass: {type: integer, range: [0, 10]}
- id: operating_hours
  type: integer
  description: 16-bit unsigned, MSB in DATA[1], LSB in DATA[2]
- id: serial_code
  type: string
  description: 14 ASCII characters (production code)
- id: scheduling_page
  type: object
  fields:
    page: {type: integer, range: [1, 7]}
    enabled: {type: boolean}
    start_h: {type: integer, range: [0, 24], notes: "24 = NULL"}
    start_m: {type: integer, range: [0, 60], notes: "60 = NULL"}
    end_h: {type: integer, range: [0, 24], notes: "24 = NULL"}
    end_m: {type: integer, range: [0, 60], notes: "60 = NULL"}
    video_src: {type: enum, values_ref: current_source}
    workdays: {type: bitmask, bits: [every_week, mon, tue, wed, thu, fri, sat, sun]}
    bookmark_tag: {type: integer, range: [0, 7], notes: "0=none, 1..7=Tag1..7"}
- id: language
  type: enum
  values: [en, de, zh_cn, fr, it, es, ru, pl, tr, zh_tw, ja, pt, ar, da, sv, fi, no, nl]
- id: pixel_shift
  type: enum
  values: [off, s10, s20, s30, s40, s50, s60, s70, s80, s90, s100, s110, s120, s130, s140, s150, s160, s170, s180, s190, s200, s210, s220, s230, s240, s250, s260, s270, s280, s290, s300, s310, s320, s330, s340, s350, s360, s370, s380, s390, s400, s410, s420, s430, s440, s450, s460, s470, s480, s490, s500, s510, s520, s530, s540, s550, s560, s570, s580, s590, s600, s610, s620, s630, s640, s650, s660, s670, s680, s690, s700, s710, s720, s730, s740, s750, s760, s770, s780, s790, s800, s810, s820, s830, s840, s850, s860, s870, s880, s890, s900, auto]
  notes: 0x00=off, 0x01..0x5A=10s..900s (10s steps), 0x5B=AUTO. Mapped here as off, s10..s900 (every10s), auto.
```

## Variables
```yaml
# Settable numeric parameters exposed by Set commands but not discrete actions of their own.
- id: video_parameters_block
  label: Video parameters (brightness/color/contrast/sharpness/tint/black_level/gamma)
  type: object
  fields: {brightness: int, color: int, contrast: int, sharpness: int, tint: int, black_level: int, gamma: enum}
- id: color_parameters_block
  label: Color parameters (RGB gain/offset)
  type: object
  fields: {r_gain: int, g_gain: int, b_gain: int, r_off: int, g_off: int, b_off: int}
- id: volume_limits
  label: Volume limits (min/max/switch-on)
  type: object
  fields: {min: int, max: int, switch_on: int}
- id: scheduling_page_state
  label: Scheduling page state
  type: object
  fields: {page: int, enabled: bool, start: time, end: time, source: enum, workdays: bitmask, bookmark_tag: int}
- id: cold_start_power
  label: Cold start power behaviour
  type: enum
  values: [power_off, forced_on, last_status]
```

## Events
```yaml
# Source describes report replies to Get commands but does not document unsolicited events.
# UNRESOLVED: no unsolicited event packets documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings or interlock procedures beyond the "do not send a
# new command before ACK, retry after 500 ms" timing rule (see Notes).
```

## Notes
Frame format (source §2.3): every Set/Get command is a packet starting with header `0xA6`, monitor ID (1..255, 0=broadcast/no ACK), category `0x00`, page `0x00`, a Code1 byte, a Length byte equal to `N+3` where N is the number of Data bytes, data control `0x01`, the Data bytes, and a final XOR checksum over bytes 1..N+6 (everything except the checksum itself). Reports from the display begin with header `0x21` and carry the same data shape. Communication rule (source §2.2): send next command only after receiving ACK; retry if no response within 500 ms. ACK on success, NACK on corrupt packet, NAV on valid-but-unsupported. Wrong monitor ID yields no reply.

LAN note (source §2.2): for LAN control the port is **5000** (TCP), carrying the same byte frames as RS-232. Per source, powering the screen on via LAN requires the OSD "Power Save" option to be set to **Mode 2**.

Volume mute (source §7.1.1): setting speaker volume to 0 does NOT overwrite the system mute state.

Workdays bitmask (source §9.1.2/9.1.3): bit0=every week, bit1=Monday, ..., bit7=Sunday.

<!-- UNRESOLVED: document revision history lists revisions up to V3.2 (2019-10-31); exact document version stamp attached to this scan not stated. -->

## Provenance

```yaml
source_domains:
  - cdn.iiyama.com
source_urls:
  - https://cdn.iiyama.com/f/dcee9a0889b9f1e85fd5ac0fa77eaf96_lhxx54-rs232-lan-commands-improved-2023-08.pdf
retrieved_at: 2026-07-14T03:17:47.544Z
last_checked_at: 2026-08-19T09:26:12.836Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:26:12.836Z
matched_actions: 34
action_count: 34
confidence: medium
summary: "All 34 spec actions match source opcodes, parameter shapes, and transport values verbatim; source documents no additional host-sent command codes beyond these 34. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "per-model feature variation not enumerated beyond the OSD availability caveat; firmware versions not stated"
- "no unsolicited event packets documented in source"
- "no multi-step sequences described in source"
- "source contains no safety warnings or interlock procedures beyond the \"do not send a"
- "document revision history lists revisions up to V3.2 (2019-10-31); exact document version stamp attached to this scan not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0

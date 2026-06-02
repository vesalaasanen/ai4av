---
spec_id: admin/hisense-55u78qg-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 55U78QG Series Control Spec"
manufacturer: HiSense
model_family: 55U78QG
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - 55U78QG
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - hisense.id
  - hisense-b2b.com
  - ltb.no
source_urls:
  - https://hisense.id/wp-content/uploads/2023/10/Hisense_RS232_DOC_V1.5-3-1.pdf
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - https://ltb.no/media/multicase/documents/hisense/dm66d/hcd_rs232_control_guide_v2.0.pdf
retrieved_at: 2026-05-14T10:38:46.017Z
last_checked_at: 2026-06-02T17:22:22.133Z
generated_at: 2026-06-02T17:22:22.133Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "target model 55U78QG not present in source; source covers 85U7K + E/M/WR/MR series."
  - "E-Series documents 115200 baud; M/WR/MR document 9600 baud."
  - "IP/TCP port not stated in source"
  - "range not stated in source"
  - "no event/notification protocol described in source."
  - "no multi-step macro sequences documented in source."
  - "source does not describe safety interlocks, fault behavior, or"
  - "target model 55U78QG not present in source; TCP port not stated; E-Series vs M/WR/MR baud mismatch unresolvable without additional source."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:22:22.133Z
  matched_actions: 121
  action_count: 121
  confidence: medium
  summary: "All 121 spec actions verified against source; E/M/WR/MR protocol opcodes, frame structures, and baud rates confirmed. Transport parameters verified or properly marked UNRESOLVED. Bidirectional spec-source coverage is complete. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-01
---

# HiSense 55U78QG Series Control Spec

## Summary

Control spec compiled from a Hisense multi-series RS232/IP control guide. The guide documents four Hisense product lines — E-Series (digital signage), M-Series (24/7 digital signage), WR6CE/WR6BE (interactive touch), and MR6DE/MR6DE-E (interactive touch) — using two distinct hex framing protocols. The user-stated target model (55U78QG) is a consumer U7-series ULED TV and is not explicitly identified in the source document; the source document's title page references "Hisense 85U7K — RS232 / IP Control Guide". This spec therefore captures the protocol-level evidence in the source and flags the model-mismatch in the Notes section.

<!-- UNRESOLVED: target model 55U78QG not present in source; source covers 85U7K + E/M/WR/MR series. -->

## Transport
```yaml
# The source documents two framing protocols (E-Series: A6-header + XOR-checksum;
# M/WR/MR: DD FF ... BB CC frame with XOR over Length+Command+ID+Data).
# Both framings are stated to operate over RS-232 (E-Series baud 115200, M/WR/MR
# baud 9600). Several E-Series commands are tagged "IP Control" in the source,
# indicating the same A6 frame can be carried over TCP/IP. No IP port number is
# stated for any series in the source.
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # M-Series / WR-SERIES / MR6DE use 9600
  # UNRESOLVED: E-Series documents 115200 baud; M/WR/MR document 9600 baud.
  # The two are inconsistent across series; the source does not state which
  # baud applies to the 55U78QG model.
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: null  # UNRESOLVED: IP/TCP port not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # inferred from power on/off + power-on-mode commands
- routable     # inferred from input source select commands
- queryable    # inferred from get/query commands returning state
- levelable    # inferred from volume / brightness / contrast / sharpness / colour-temp controls
```

## Actions
```yaml
# ============================================================
# E-SERIES commands - A6 frame, XOR checksum, 115200 baud
# Frame: A6 {monitor_id=01..FF} 00 00 00 {len=N+3} 01 {code} {data[0..N]} {XOR_checksum}
# ============================================================

# --- E-Series: Volume ---
- id: e_set_volume
  label: E-Series Set Volume
  kind: action
  command: "A6 {id} 00 00 00 04 01 44 {volume} {checksum}"
  params:
    - {name: id, type: integer, description: "Monitor ID 0x01-0xFF"}
    - {name: volume, type: integer, description: "Volume 0-100"}
  notes: "Example vol=77: A6 01 00 00 00 04 01 44 4D AB. checksum = XOR of all preceding bytes."

- id: e_get_volume
  label: E-Series Get Volume
  kind: query
  command: "A6 {id} 00 00 00 03 01 45 {checksum}"
  params:
    - {name: id, type: integer, description: "Monitor ID 0x01-0xFF"}
  notes: "Example: A6 01 00 00 00 03 01 45 E0. Reply: 21 01 00 00 04 01 45 4D 2D (vol=77)."

# --- E-Series: Video params (RS232 variant - 7 data bytes) ---
- id: e_set_video_params_rs232
  label: E-Series Set Video Params (RS232)
  kind: action
  command: "A6 {id} 00 00 00 0A 01 32 {picmode} {brightness} {contrast} {coltemp} {overscan} {pcmode} {checksum}"
  params:
    - {name: id, type: integer, description: "Monitor ID 0x01-0xFF"}
    - {name: picmode, type: integer, description: "PICMODE: 3=USER, 7=AIRPORT, 8=HOTEL, 9=DINING, 10=SECURITY, 11=OFFICE, 12=OUTDOOR"}
    - {name: brightness, type: integer, description: "0-100"}
    - {name: contrast, type: integer, description: "0-100"}
    - {name: coltemp, type: integer, description: "0=normal, 1=cool, 2=warm"}
    - {name: overscan, type: integer, description: "0=close, 1=open"}
    - {name: pcmode, type: integer, description: "0=Auto, 1=PC, 2=video"}
  notes: "Example USER/32/32/cool/overscan-on/PC: A6 01 00 00 00 0A 01 32 03 20 20 01 01 01 9F."

- id: e_get_video_params_rs232
  label: E-Series Get Video Params (RS232)
  kind: query
  command: "A6 {id} 00 00 00 03 01 33 {checksum}"
  params:
    - {name: id, type: integer, description: "Monitor ID 0x01-0xFF"}
  notes: "Example: A6 01 00 00 00 03 01 33 96. Reply carries 7 data bytes."

# --- E-Series: Video params (IP Control variant - 8 data bytes, includes sharpness) ---
- id: e_set_video_params_ip
  label: E-Series Set Video Params (IP Control)
  kind: action
  command: "A6 {id} 00 00 00 0A 01 32 {picmode} {brightness} {contrast} {coltemp} {overscan} {pcmode} {sharpness} {checksum}"
  params:
    - {name: id, type: integer, description: "Monitor ID 0x01-0xFF"}
    - {name: picmode, type: integer, description: "PICMODE 3/7/8/9/10/11/12"}
    - {name: brightness, type: integer, description: "0-100"}
    - {name: contrast, type: integer, description: "0-100"}
    - {name: coltemp, type: integer, description: "0=normal, 1=cool, 2=warm"}
    - {name: overscan, type: integer, description: "0=close, 1=open"}
    - {name: pcmode, type: integer, description: "0=Auto, 1=PC, 2=video"}
    - {name: sharpness, type: integer, description: "0-100"}
  notes: "Example: A6 01 00 00 00 0A 01 32 03 20 20 01 01 01 32 AE. Note: this is the IP Control variant of 0x32 - different length from the RS232 variant above."

- id: e_get_video_params_ip
  label: E-Series Get Video Params (IP Control)
  kind: query
  command: "A6 {id} 00 00 00 03 01 33 {checksum}"
  params:
    - {name: id, type: integer, description: "Monitor ID 0x01-0xFF"}
  notes: "Example: A6 01 00 00 00 03 01 33 96. Reply carries 8 data bytes incl. sharpness."

# --- E-Series: Sound mode + balance ---
- id: e_set_sound_mode_balance
  label: E-Series Set Sound Mode and Balance
  kind: action
  command: "A6 {id} 00 00 00 05 01 42 {mode} {balance} {checksum}"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
    - {name: mode, type: integer, description: "0=STANDARD, 1=NEWS, 2=MUSIC, 3=MOVIE"}
    - {name: balance, type: integer, description: "OSD -50 to 50 → wire 0 to 100"}
  notes: "Example STANDARD/-50: A6 01 00 00 00 05 01 42 00 00 E1."

- id: e_get_sound_mode_balance
  label: E-Series Get Sound Mode and Balance
  kind: query
  command: "A6 {id} 00 00 00 03 01 43 {checksum}"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
  notes: "Example: A6 01 00 00 00 03 01 43 E6."

# --- E-Series: IR key simulation ---
- id: e_set_key
  label: E-Series Simulate IR Key
  kind: action
  command: "A6 {id} 00 00 00 05 01 B0 {key_hi} {key_lo} {checksum}"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
    - {name: key_hi, type: integer, description: "IR key high byte"}
    - {name: key_lo, type: integer, description: "IR key low byte"}
  notes: |
    Key table (high lo): Power 0x74 / 0x00, Setting 0xFD / 0x00, Up 0x67 / 0x00,
    Down 0x6C / 0x00, OK 0x1C / 0x00, Right 0x6A / 0x00, Left 0x69 / 0x00,
    Home 0x66 / 0x00, Vol+ 0x73 / 0x00, Vol- 0x72 / 0x00, Return 0x9E / 0x00,
    Source 0xFA / 0x00. Mute example: A6 01 00 00 00 05 01 B0 00 71 62.

# --- E-Series: Input source ---
- id: e_set_input_source
  label: E-Series Set Input Source
  kind: action
  command: "A6 {id} 00 00 00 04 01 AC {source} {checksum}"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
    - {name: source, type: integer, description: "0x0D=HDMI1, 0x06=HDMI2, 0x15=CMS, 0x16=Media, 0x18=Custom, 0x0C=USB"}
  notes: "Example HDMI1: A6 01 00 00 00 04 01 AC 0D 03."

- id: e_get_input_source
  label: E-Series Get Input Source
  kind: query
  command: "A6 {id} 00 00 00 03 01 AD {checksum}"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
  notes: "Example: A6 01 00 00 00 03 01 AD 08. Reply: 21 01 00 00 04 01 AD 0D 85 (HDMI1)."

# --- E-Series: Power on/off (RS232) ---
- id: e_set_power
  label: E-Series Set Power (RS232)
  kind: action
  command: "A6 {id} 00 00 00 04 01 18 {state} {checksum}"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
    - {name: state, type: integer, description: "0x01=power off, 0x02=power on"}
  notes: 'Example off: A6 01 00 00 00 04 01 18 01 BB. on: A6 01 00 00 00 04 01 18 02 B8. Requires "Uart Wake" = On.'

- id: e_get_power
  label: E-Series Get Power State
  kind: query
  command: "A6 {id} 00 00 00 03 01 19 {checksum}"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
  notes: 'Example: A6 01 00 00 00 03 01 19 BC. Reply on: 21 01 00 00 04 01 19 02 3E. Requires "Uart Wake" = On.'

# --- E-Series: Power on mode ---
- id: e_set_power_on_mode
  label: E-Series Set Power On Mode
  kind: action
  command: "A6 {id} 00 00 00 04 01 A3 {mode} {checksum}"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
    - {name: mode, type: integer, description: "0=Standby, 1=Power On, 2=Last status"}
  notes: "Example Standby: A6 01 00 00 00 04 01 A3 00 01."

# --- E-Series: Aspect ratio (IP Control) ---
- id: e_set_aspect_ratio
  label: E-Series Set Aspect Ratio (IP Control)
  kind: action
  command: "A6 {id} 00 00 00 04 01 3A {ratio} {checksum}"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
    - {name: ratio, type: integer, description: "0x00=Full, 0x01=Real, 0x02=4:3, 0x03=14:9"}
  notes: "Example Full: A6 01 00 00 00 04 01 3A 00 98."

- id: e_get_aspect_ratio
  label: E-Series Get Aspect Ratio (IP Control)
  kind: query
  command: "A6 {id} 00 00 00 03 01 3B {checksum}"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
  notes: "Example: A6 01 00 00 00 03 01 3B 9E. Reply Full: 21 01 00 00 04 01 3B 00 1E."

# --- E-Series: Remote control lock (IP Control) ---
- id: e_set_remote_lock
  label: E-Series Set Remote Lock (IP Control)
  kind: action
  command: "A6 {id} 00 00 00 04 01 1C {state} {checksum}"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
    - {name: state, type: integer, description: "0x01=unlock, 0x02=lock"}
  notes: "Example unlock: A6 01 00 00 00 04 01 1C 01 BF."

- id: e_get_remote_lock
  label: E-Series Get Remote Lock (IP Control)
  kind: query
  command: "A6 {id} 00 00 00 03 01 1D {checksum}"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
  notes: "Example: A6 01 00 00 00 03 01 1D B8. Reply lock: 21 01 00 00 04 01 1D 02 3A."

# --- E-Series: Schedule (IP Control) ---
- id: e_set_schedule
  label: E-Series Set Schedule (IP Control)
  kind: action
  command: "A6 {id} 00 00 00 0C 01 5A {page_enable} {start_h} {start_m} {end_h} {end_m} {source} {weekday_bits} {media_tag} {volume} {checksum}"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
    - {name: page_enable, type: integer, description: "Bits 7-4: page 1-7; bits 3-0: 0=disable, 1=enable"}
    - {name: start_h, type: integer, description: "Start hour 0-23"}
    - {name: start_m, type: integer, description: "Start minute 0-59"}
    - {name: end_h, type: integer, description: "End hour 0-23"}
    - {name: end_m, type: integer, description: "End minute 0-59"}
    - {name: source, type: integer, description: "0x06=HDMI2, 0x0C=USB, 0x0D=HDMI1, 0x12=CMS, 0x16=Media Player, 0x18=Custom"}
    - {name: weekday_bits, type: integer, description: "Bit0=Sat, Bit1=Fri, Bit2=Thu, Bit3=Wed, Bit4=Tue, Bit5=Mon, Bit6=Sun, Bit7=every week"}
    - {name: media_tag, type: integer, description: "0=none, 1-7=tag index (for Media Player)"}
    - {name: volume, type: integer, description: "0-100"}
  notes: "Example page5/enable/13:00-13:05/HDMI2/Mon/50: A6 01 00 00 00 0C 01 5A 51 0D 00 0D 05 06 A0 00 32 30."

- id: e_get_schedule
  label: E-Series Get Schedule (IP Control)
  kind: query
  command: "A6 {id} 00 00 00 04 01 5B {page} {checksum}"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
    - {name: page, type: integer, description: "Page 1-7"}
  notes: "Example page 1: A6 01 00 00 00 04 01 5B 01 F8."

# --- E-Series: Screen on/off (IP Control) ---
- id: e_set_screen_state
  label: E-Series Set Screen State (IP Control)
  kind: action
  command: "A6 {id} 00 00 00 04 01 18 {state} {checksum}"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
    - {name: state, type: integer, description: "0x01=power off, 0x03=screen on, 0x04=screen off"}
  notes: 'Same opcode 0x18 as E-Series power, different data values. Example off: A6 01 00 00 00 04 01 18 01 BB. screen on: A6 01 00 00 00 04 01 18 03 B9. screen off: A6 01 00 00 00 04 01 18 04 BE.'

# ============================================================
# M-SERIES commands - DD FF {len} {cmd4} {id} {data..} {xor} BB CC
# Frame: header DD FF, length=2B, command=4B, monitor_id=1B, data=N, checksum=1B (XOR of len+cmd+id+data), end BB CC
# ============================================================

- id: m_screen_on
  label: M-Series Screen On
  kind: action
  command: "DD FF 00 07 C1 31 00 01 01 01 F6 BB CC"
  notes: "Reply: AB AB 00 07 C1 31 00 01 01 01 F6 CD CD. Length=07 includes cmd+id+data+checksum."

- id: m_screen_off
  label: M-Series Screen Off
  kind: action
  command: "DD FF 00 07 C1 31 00 01 01 00 F7 BB CC"
  notes: "Reply: AB AB 00 07 C1 31 00 01 01 00 F7 CD CD."

- id: m_query_sw_version
  label: M-Series Query Software Version
  kind: query
  command: "DD FF 00 06 C1 1B 00 00 01 DD BB CC"
  notes: "Reply: AB AB 00 09 C1 1B 00 00 01 {year} {month} {day} {xor} CD CD."

- id: m_set_date
  label: M-Series Set Date
  kind: action
  command: "DD FF 00 09 C1 1C 00 00 01 {year} {month} {day} {xor} BB CC"
  params:
    - {name: year, type: integer, description: "Year byte"}
    - {name: month, type: integer, description: "Month byte"}
    - {name: day, type: integer, description: "Day byte"}

- id: m_set_time
  label: M-Series Set Time
  kind: action
  command: "DD FF 00 09 C1 1D 00 00 01 {hour} {minute} {second} {xor} BB CC"
  params:
    - {name: hour, type: integer, description: "Hour 0-23"}
    - {name: minute, type: integer, description: "Minute 0-59"}
    - {name: second, type: integer, description: "Second 0-59"}

- id: m_reboot
  label: M-Series Reboot
  kind: action
  command: "DD FF 00 06 C1 1E 00 00 01 D8 BB CC"

- id: m_power_on
  label: M-Series Power On
  kind: action
  command: "DD FF 00 08 C1 15 00 00 01 BB BB DD BB CC"
  notes: "Standby feedback then power-on feedback."

- id: m_power_off
  label: M-Series Power Off
  kind: action
  command: "DD FF 00 08 C1 15 00 00 01 AA AA DD BB CC"

- id: m_set_volume
  label: M-Series Set Volume
  kind: action
  command: "DD FF 00 07 C1 27 00 00 01 {volume} {xor} BB CC"
  params:
    - {name: volume, type: integer, description: "Volume 0-100"}

- id: m_mute_on
  label: M-Series Mute On
  kind: action
  command: "DD FF 00 07 C1 26 00 00 01 01 E0 BB CC"

- id: m_mute_off
  label: M-Series Mute Off
  kind: action
  command: "DD FF 00 07 C1 26 00 00 01 00 E1 BB CC"

- id: m_vga_auto_adjust
  label: M-Series VGA Auto Adjust
  kind: action
  command: "DD FF 00 06 C1 01 00 00 01 C7 BB CC"

- id: m_factory_reset
  label: M-Series Factory Reset
  kind: action
  command: "DD FF 00 06 C1 10 00 00 01 D6 BB CC"

- id: m_set_screen_rotation
  label: M-Series Set Screen Rotation
  kind: action
  command: "DD FF 00 07 C1 35 00 00 01 {rotation} {xor} BB CC"
  params:
    - {name: rotation, type: integer, description: "0=0 deg, 1=90 deg. 811 not supported. Takes effect after reboot."}

- id: m_set_brightness
  label: M-Series Set Brightness
  kind: action
  command: "DD FF 00 07 C1 36 00 00 01 {brightness} {xor} BB CC"
  params:
    - {name: brightness, type: integer, description: "Brightness value"}

- id: m_set_contrast
  label: M-Series Set Contrast
  kind: action
  command: "DD FF 00 07 C1 37 00 00 01 {contrast} {xor} BB CC"
  params:
    - {name: contrast, type: integer, description: "Contrast value"}

- id: m_set_color_temperature
  label: M-Series Set Color Temperature
  kind: action
  command: "DD FF 00 07 C1 39 00 00 01 {coltemp} {xor} BB CC"
  params:
    - {name: coltemp, type: integer, description: "01=Cold, 02=Slight Cold, 03=Slight Warm, 04=Warm, 00=Standard"}

- id: m_set_zoom
  label: M-Series Set Zoom
  kind: action
  command: "DD FF 00 07 C1 3B 00 00 01 {zoom} {xor} BB CC"
  params:
    - {name: zoom, type: integer, description: "02=Zoom Standard; others=Full Screen. 811 not supported."}

- id: m_set_boot_time_delay
  label: M-Series Set Boot Time Delay
  kind: action
  command: "DD FF 00 07 C1 3C 00 00 01 {delay} {xor} BB CC"
  params:
    - {name: delay, type: integer, description: "01=10s, 02=20s, 03=30s, 00=0s. 811 not supported."}

- id: m_set_definition
  label: M-Series Set Definition
  kind: action
  command: "DD FF 00 07 C1 38 00 00 01 {definition} {xor} BB CC"
  params:
    - {name: definition, type: integer, description: "Definition value"}

- id: m_set_image_denoising
  label: M-Series Set Image Denoising
  kind: action
  command: "DD FF 00 07 C1 3A 00 00 01 {denoise} {xor} BB CC"
  params:
    - {name: denoise, type: integer, description: "00=Off, 01=Low, 02=Medium, 03=High, 04=Auto"}

- id: m_query_smart_backlight
  label: M-Series Query Smart Backlight
  kind: query
  command: "DD FF 00 06 C1 3E 00 01 01 F9 BB CC"
  notes: "Reply: AB AB 00 07/08 ... 01=Bright Light, 02=Soft Light, 03=Light Sensed Freq Conv, 04=Stereo Freq Conv, 05=Comfort Freq Conv, 06=Custom (next byte=backlight value)."

- id: m_query_screen_state
  label: M-Series Query Screen On/Off
  kind: query
  command: "DD FF 00 06 C1 32 00 01 01 F5 BB CC"
  notes: "Reply byte: 00=Screen Off, 01=Screen On."

- id: m_set_smart_backlight
  label: M-Series Set Smart Backlight
  kind: action
  command: "DD FF 00 08 C1 32 00 02 01 {mode} {value} {xor} BB CC"
  params:
    - {name: mode, type: integer, description: "01=Bright, 02=Soft, 03=Light Sensed Freq Conv, 04=Stereo Freq Conv, 05=Comfort Freq Conv, 06=Custom"}
    - {name: value, type: integer, description: "Backlight value (used when mode=06 custom)"}

- id: m_set_boot_time
  label: M-Series Set Boot Time (UTC)
  kind: action
  command: "DD FF 00 09 C1 3E 00 02 01 {day} {hour} {minute} {xor} BB CC"
  params:
    - {name: day, type: integer, description: "0=off, otherwise day-of-week byte"}
    - {name: hour, type: integer, description: "Hour (UTC)"}
    - {name: minute, type: integer, description: "Minute (UTC)"}
  notes: "Subtract 8 for GMT+8."

- id: m_set_power_off_time
  label: M-Series Set Power Off Time (UTC)
  kind: action
  command: "DD FF 00 09 C1 FF 00 15 01 {day} {hour} {minute} {xor} BB CC"
  params:
    - {name: day, type: integer, description: "0=off, otherwise day-of-week byte"}
    - {name: hour, type: integer, description: "Hour (UTC)"}
    - {name: minute, type: integer, description: "Minute (UTC)"}

- id: m_set_anti_burn
  label: M-Series Set Anti-Burn (Image Retention)
  kind: action
  command: "DD FF 00 07 C1 33 00 00 01 {state} {xor} BB CC"
  params:
    - {name: state, type: integer, description: "00=off, 01=on. Only 551 supported."}

- id: m_set_remote_enable
  label: M-Series Remote Enable/Disable
  kind: action
  command: "DD FF 00 07 C1 70 00 00 01 {state} {xor} BB CC"
  params:
    - {name: state, type: integer, description: "00=enable, 01=disable remote control"}

- id: m_picture_mode_standard
  label: M-Series Picture Mode Standard
  kind: action
  command: "DD FF 00 07 C1 0F 06 00 01 07 C9 BB CC"

- id: m_picture_mode_soft
  label: M-Series Picture Mode Soft
  kind: action
  command: "DD FF 00 07 C1 0F 06 00 01 09 C7 BB CC"

- id: m_picture_mode_movie
  label: M-Series Picture Mode Movie
  kind: action
  command: "DD FF 00 07 C1 0F 06 00 01 0A C4 BB CC"

- id: m_picture_mode_vivid
  label: M-Series Picture Mode Vivid
  kind: action
  command: "DD FF 00 07 C1 0F 06 00 01 08 C6 BB CC"

- id: m_inquire_function
  label: M-Series Inquire Function
  kind: query
  command: "DD FF 00 06 C1 28 00 00 01 EE BB CC"
  notes: "Reply: 0C bytes - volume, source (05 05=HDMI1, 05 04=HDMI2, 05 03=DP, 08 01=VGA), power (00=on, FF=off), mute (01/00)."

- id: m_inquire_source
  label: M-Series Inquire Current Source
  kind: query
  command: "DD FF 00 06 C1 1A 00 00 01 DC BB CC"
  notes: "Reply: 05 03 04=HDMI1, 05 03 03=HDMI2, 05 03 02=DP, 06 04 00=VGA."

- id: m_switch_source
  label: M-Series Switch Source
  kind: action
  command: "DD FF 00 07 C1 08 00 01 {id} {source} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
    - {name: source, type: integer, description: "0E=HDMI1, 0F=HDMI2, 16=DP, 17=VGA"}

# ============================================================
# WR6CE / WR6BE / MR6DE / MR6DE-E commands
# Same DD FF frame as M-Series. Baud 9600.
# (The WR6 and MR6 tables share most commands but differ in source/input values.)
# ============================================================

- id: wr_power_on
  label: WR6 Power On
  kind: action
  command: "DD FF 00 08 C1 15 00 00 {id} BB BB {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
  notes: "Example: DDFF0008C115000001BBBBDDBBCC."

- id: wr_power_off
  label: WR6 Power Off
  kind: action
  command: "DD FF 00 08 C1 15 00 00 {id} AA AA {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}

- id: wr_screen_on
  label: WR6 Screen On
  kind: action
  command: "DD FF 00 07 C1 31 00 00 {id} 01 {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
  notes: "WR6 screen-on uses data byte 01. MR6 also uses 01 for screen on, 00 for screen off (see wr_screen_off)."

- id: wr_screen_off
  label: WR6 Screen Off
  kind: action
  command: "DD FF 00 07 C1 31 00 00 {id} 00 {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
  notes: "WR6 data=00 = screen off. MR6 data=00 also = screen off; data=01 = screen on."

- id: wr_reboot
  label: WR6 Reboot
  kind: action
  command: "DD FF 00 06 C1 1E 00 00 {id} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}

- id: wr_set_ac_power_on_mode
  label: WR6 Set AC Power On Mode
  kind: action
  command: "DD FF 00 07 C1 FF 00 09 {id} {mode} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
    - {name: mode, type: integer, description: "WR6 examples: 00=power on. Source states 00=power on, 01=Last mode, 02=standby."}

- id: wr_source_dp
  label: WR6 Source DP
  kind: action
  command: "DD FF 00 07 C1 08 00 01 {id} 0C {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}

- id: wr_source_type_c
  label: WR6 Source Type-C
  kind: action
  command: "DD FF 00 07 C1 08 00 01 {id} 0B {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}

- id: wr_source_front_hdmi
  label: WR6 Source Front HDMI
  kind: action
  command: "DD FF 00 07 C1 08 00 01 {id} 05 {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}

- id: wr_source_side_hdmi
  label: WR6 Source Side HDMI
  kind: action
  command: "DD FF 00 07 C1 08 00 01 {id} 06 {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}

- id: wr_source_ops
  label: WR6 Source OPS
  kind: action
  command: "DD FF 00 07 C1 08 00 01 {id} 04 {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}

- id: mr_source_front_hdmi
  label: MR6 Source Front HDMI
  kind: action
  command: "DD FF 00 07 C1 08 00 00 {id} 1A {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}

- id: mr_source_side_hdmi1
  label: MR6 Source Side HDMI1
  kind: action
  command: "DD FF 00 07 C1 08 00 00 {id} 24 {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}

- id: mr_source_side_hdmi2
  label: MR6 Source Side HDMI2
  kind: action
  command: "DD FF 00 07 C1 08 00 00 {id} 25 {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}

- id: mr_source_pc
  label: MR6 Source PC
  kind: action
  command: "DD FF 00 07 C1 08 00 00 {id} 0C {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}

- id: mr_source_type_c
  label: MR6 Source Type-C
  kind: action
  command: "DD FF 00 07 C1 08 00 00 {id} 1C {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}

- id: wr_set_aspect_ratio
  label: WR6 Set Screen Aspect Ratio
  kind: action
  command: "DD FF 00 07 C1 35 00 00 {id} {rotation} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
    - {name: rotation, type: integer, description: "00=0 deg, 01=90 deg. Takes effect after reboot."}

- id: wr_set_mute
  label: WR6 Set Mute
  kind: action
  command: "DD FF 00 07 C1 26 00 00 {id} 01 {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}

- id: wr_set_unmute
  label: WR6 Set Unmute
  kind: action
  command: "DD FF 00 07 C1 26 00 00 {id} 00 {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}

- id: wr_set_volume
  label: WR6 Set Volume
  kind: action
  command: "DD FF 00 07 C1 27 00 00 {id} {volume} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
    - {name: volume, type: integer, description: "0-100"}

- id: wr_set_backlight_brightness
  label: WR6 Set Backlight Brightness
  kind: action
  command: "DD FF 00 08 C1 32 00 00 {id} 06 {value} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
    - {name: value, type: integer, description: "Backlight value. Example 32=0x20: DDFF0008C1320000010620DCBBCC."}

- id: wr_set_backlight_auto
  label: WR6 Set Backlight Brightness Auto Adjust
  kind: action
  command: "DD FF 00 07 C1 34 00 00 {id} {state} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
    - {name: state, type: integer, description: "00=on, 01=off"}

- id: wr_set_date
  label: WR6 Set Date
  kind: action
  command: "DD FF 00 09 C1 1C 00 00 {id} {year} {month} {day} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
    - {name: year, type: integer, description: "Year byte"}
    - {name: month, type: integer, description: "Month byte"}
    - {name: day, type: integer, description: "Day byte"}
  notes: "Reply returns FF FF FF on error."

- id: wr_set_time
  label: WR6 Set Time
  kind: action
  command: "DD FF 00 09 C1 1D 00 00 {id} {hour} {minute} {second} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
    - {name: hour, type: integer, description: "Hour byte"}
    - {name: minute, type: integer, description: "Minute byte"}
    - {name: second, type: integer, description: "Second byte"}

- id: wr_set_schedule_power_on
  label: WR6 Set Schedule Power On
  kind: action
  command: "DD FF 00 09 C1 3E 00 00 {id} {tt} {hour} {minute} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
    - {name: tt, type: integer, description: "00=off, 01=everyday"}
    - {name: hour, type: integer, description: "Hour"}
    - {name: minute, type: integer, description: "Minute"}

- id: wr_set_schedule_power_off
  label: WR6 Set Schedule Power Off
  kind: action
  command: "DD FF 00 09 C1 3F 00 00 {id} {tt} {hour} {minute} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
    - {name: tt, type: integer, description: "0=off, 1=everyday"}
    - {name: hour, type: integer, description: "Hour"}
    - {name: minute, type: integer, description: "Minute"}

- id: wr_set_brightness
  label: WR6 Set Brightness
  kind: action
  command: "DD FF 00 07 C1 36 00 00 {id} {value} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
    - {name: value, type: integer, description: "0-100. Source must be DP/VGA/HDMI/PC/DVI."}

- id: wr_set_contrast
  label: WR6 Set Contrast
  kind: action
  command: "DD FF 00 07 C1 37 00 00 {id} {value} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
    - {name: value, type: integer, description: "0-100. Source must be DP/VGA/HDMI/PC/DVI."}

- id: wr_set_sharpness
  label: WR6 Set Sharpness
  kind: action
  command: "DD FF 00 07 C1 38 00 00 {id} {value} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
    - {name: value, type: integer, description: "0-100. Source must be DP/VGA/HDMI/PC/DVI."}

- id: wr_set_color_temperature
  label: WR6 Set Color Temperature
  kind: action
  command: "DD FF 00 07 C1 39 00 00 {id} {value} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
    - {name: value, type: integer, description: "0-100. Source must be DP/VGA/HDMI/PC/DVI."}

- id: wr_set_noise_reduction
  label: WR6 Set Noise Reduction
  kind: action
  command: "DD FF 00 07 C1 3A 00 00 {id} {nr} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
    - {name: nr, type: integer, description: "01=low, 02=medium, 03=high, 04=auto, 00=off. Source must be DP/VGA/HDMI/PC/DVI."}

- id: wr_set_image_scaling
  label: WR6 Set Image Scaling
  kind: action
  command: "DD FF 00 07 C1 3B 00 00 {id} {scale} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
    - {name: scale, type: integer, description: "00=full, 01=16:9, 02=4:3, 03=scaling 1, 04=scaling 2, 05=point to point. Source must be DP/VGA/HDMI/PC/DVI."}

- id: wr_set_picture_mode
  label: WR6 Set Picture Mode
  kind: action
  command: "DD FF 00 07 C1 0F 06 00 {id} {mode} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
    - {name: mode, type: integer, description: "00=standard, 01=bright, 02=soft, 03=Movie, 04=Text, 05=gaming, 12=natural"}

- id: wr_set_sound_mode
  label: WR6 Set Sound Mode
  kind: action
  command: "DD FF 00 07 C1 FF 00 03 {id} {mode} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
    - {name: mode, type: integer, description: "00=standard, 01=music, 02=news, 08=movie, 10=sports, 20=custom, 30=voice, 40=meeting"}

- id: wr_set_eye_protection
  label: WR6 Set Eye Protection Mode
  kind: action
  command: "DD FF 00 07 C1 FF 00 1E {id} {state} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
    - {name: state, type: integer, description: "00=off, 01=on"}

- id: wr_vga_auto_adjust
  label: WR6 VGA Auto Adjust
  kind: action
  command: "DD FF 00 07 C1 01 00 00 {id} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID. Source must be VGA."}

- id: wr_set_anti_burn
  label: WR6 Set Anti-Burn-In
  kind: action
  command: "DD FF 00 07 C1 33 00 00 {id} {state} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
    - {name: state, type: integer, description: "00=off, 01=on"}

- id: wr_set_power_on_delay
  label: WR6 Set Power On Delay
  kind: action
  command: "DD FF 00 07 C1 3C 00 00 {id} {delay} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
    - {name: delay, type: integer, description: "00=off, else 2-255s"}

- id: wr_set_video_wall
  label: WR6 Set Video Wall
  kind: action
  command: "DD FF 00 09 C1 0A 00 00 {id} {v} {h} {pos} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
    - {name: v, type: integer, description: "Vertical device count"}
    - {name: h, type: integer, description: "Horizontal device count"}
    - {name: pos, type: integer, description: "Current device position"}

- id: wr_set_static_ip
  label: WR6 Set Static IP Address (LAN)
  kind: action
  command: "DD FF 00 16 C1 1B 30 00 {id} {ip4} {mask4} {gw4} {dns4} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
    - {name: ip4, type: string, description: "4-byte IP address"}
    - {name: mask4, type: string, description: "4-byte subnet mask"}
    - {name: gw4, type: string, description: "4-byte gateway"}
    - {name: dns4, type: string, description: "4-byte DNS"}
  notes: "Total 16 bytes of network data. Example IP 10.16.150.225 / 255.255.248.0 / 10.16.144.1 / 10.16.144.2: DDFF0016C11B3000010A1096E1FFFFF8000A1090010A10900249BBCC."

- id: wr_set_usb_lock
  label: WR6 Set USB Lock
  kind: action
  command: "DD FF 00 07 C1 FF 00 0E {id} {state} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
    - {name: state, type: integer, description: "00=lock USB, 01=enable USB"}

- id: wr_factory_reset
  label: WR6 Factory Reset
  kind: action
  command: "DD FF 00 06 C1 10 00 00 {id} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}

- id: wr_query_tv_status
  label: WR6 Query TV Status
  kind: query
  command: "DD FF 00 06 C1 28 00 00 {id} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
  notes: "Reply: 0C bytes - volume, source (05 01=PC, 05 02=DVI, 05 03=DP, 05 04=HDMI2, 05 05=HDMI1, 08 01=VGA), power (00=on, FF=off), mute (01/00), signal (00=no, 01=yes)."

- id: wr_query_screen_status
  label: WR6 Query Screen Status
  kind: query
  command: "DD FF 00 06 C1 32 00 00 {id} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
  notes: "Reply: 00=screen off, 01=screen on. NOTE: source row contains typo - example payload uses C1100001 which appears to be a copy-paste error in the source. Verified opcode = 0x32."

- id: wr_query_source
  label: WR6 Query Source
  kind: query
  command: "DD FF 00 06 C1 1A 00 00 {id} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}

- id: wr_query_sw_version
  label: WR6 Query SW Version
  kind: query
  command: "DD FF 00 06 C1 1B 00 00 {id} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
  notes: "Reply: Year Month Date."

- id: wr_query_backlight
  label: WR6 Query Backlight Brightness
  kind: query
  command: "DD FF 00 06 C1 3E 00 00 {id} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
  notes: "Reply: 01=bright, 02=soft, 03=auto, 04=stereo freq conv, 05=comfort freq conv, 06=custom (next byte=0-30)."

- id: wr_query_brightness
  label: WR6 Query Brightness
  kind: query
  command: "DD FF 00 06 C1 36 00 01 {id} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}

- id: wr_query_network_status
  label: WR6 Query Network Status
  kind: query
  command: "DD FF 00 06 C1 FF 00 16 {id} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
  notes: "Reply: 00=no network, 01=connected."

- id: wr_query_sound_mode
  label: WR6 Query Sound Mode
  kind: query
  command: "DD FF 00 06 C1 FF 00 02 {id} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
  notes: "Reply: 00=standard, 01=music, 02=news, 08=movie, 10=sports, 20=custom, 30=voice, 40=meeting."

- id: wr_query_ac_power_on_status
  label: WR6 Query AC Power On Status
  kind: query
  command: "DD FF 00 06 C1 FF 00 08 {id} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
  notes: "Reply: 00=power on, 01=last mode, 02=standby."

- id: wr_query_ip_address
  label: WR6 Query IP Address
  kind: query
  command: "DD FF 00 06 C1 1B 20 00 {id} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
  notes: "Reply 16 bytes: IP, mask, gateway, DNS."

- id: wr_query_device_temperature
  label: WR6 Query Device Temperature
  kind: query
  command: "DD FF 00 06 C1 FE 00 00 {id} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
  notes: "Reply: temperature in centigrade."

- id: wr_query_eye_protection
  label: WR6 Query Eye Protection
  kind: query
  command: "DD FF 00 06 C1 FF 00 1D {id} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
  notes: "Reply: 00=off, 01=on."

- id: wr_query_sn
  label: WR6 Query Serial Number
  kind: query
  command: "DD FF 00 06 C1 FF 00 0B {id} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
  notes: "Reply: 23 bytes SN."

- id: wr_query_device_id
  label: WR6 Query Device ID
  kind: query
  command: "DD FF 00 06 C1 FF 00 0D {id} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
  notes: "Reply: 32 bytes device ID."

- id: wr_query_mac
  label: WR6 Query MAC Address
  kind: query
  command: "DD FF 00 06 C1 6C 00 00 {id} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
  notes: "Reply: 8 bytes MAC."

- id: wr_send_key
  label: WR6 Send Remote Controller Key Code
  kind: action
  command: "DD FF 00 08 C1 17 00 00 {id} {key_hi} {key_lo} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
    - {name: key_hi, type: integer, description: "Key high byte"}
    - {name: key_lo, type: integer, description: "Key low byte: 00=Menu, 01=Up, 02=Down, 03=Left, 04=Right, 05=OK, 06=Return, 07=Source"}
  notes: "Example Menu: DDFF0008C1170000010000DFBBCC."

- id: wr_open_setting_menu
  label: WR6 Open Setting Menu
  kind: action
  command: "DD FF 00 06 C1 41 00 00 {id} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}

- id: wr_open_home
  label: WR6 Open Home
  kind: action
  command: "DD FF 00 06 C1 FF 00 1A {id} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}

- id: wr_open_cms
  label: WR6 Open CMS
  kind: action
  command: "DD FF 00 06 C1 FF 00 13 {id} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}

- id: wr_open_screenshare
  label: WR6 Open ScreenShare
  kind: action
  command: "DD FF 00 06 C1 43 00 00 {id} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}

- id: wr_hotspot_on
  label: WR6 Turn On Hotspot
  kind: action
  command: "DD FF 00 06 C1 44 00 00 {id} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}

- id: wr_take_screenshot
  label: WR6 Take Screenshot
  kind: action
  command: "DD FF 00 06 C1 4B 00 00 {id} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}

- id: wr_freeze_screen
  label: WR6 Freeze Screen
  kind: action
  command: "DD FF 00 06 C1 0F 08 00 {id} {state} {xor} BB CC"
  params:
    - {name: id, type: integer, description: "Monitor ID"}
    - {name: state, type: integer, description: "01=freeze, 00=unfreeze"}
```

## Feedbacks
```yaml
# Reply-frame structure per source:
# - E-Series TV->PC header = 0x21, then same trailing fields. Result byte meanings:
#   0x00=Completed, 0x01=Limit Over (upper), 0x02=Limit Over (lower),
#   0x03=Command cancelled (bad data or not permitted), 0x04=Parse Error.
# - M/WR/MR TV->PC header = AB AB ... CD CD. Length and command echo the request.
#
- id: e_result_code
  label: E-Series Result Code
  type: enum
  values: [completed, limit_upper, limit_lower, cancelled, parse_error]
  notes: "Maps to 0x00, 0x01, 0x02, 0x03, 0x04 in E-Series reply Byte 8+."

- id: e_power_state
  label: E-Series Power State
  type: enum
  values: [on, off]
  notes: "From 0x19 query reply. Requires 'Uart Wake' = On."

- id: e_input_source
  label: E-Series Current Input Source
  type: enum
  values: [hdmi1, hdmi2, cms, media, custom, usb]
  notes: "From 0xAD query reply. Codes: 0x0D, 0x06, 0x15, 0x16, 0x18, 0x0C."

- id: e_aspect_ratio
  label: E-Series Aspect Ratio
  type: enum
  values: [full, real, 4_3, 14_9]

- id: e_remote_lock_state
  label: E-Series Remote Lock State
  type: enum
  values: [unlock, lock]

- id: m_screen_state
  label: M-Series Screen State
  type: enum
  values: [off, on]
  notes: "From 0xC132 00 01 query."

- id: m_mute_state
  label: M-Series Mute State
  type: enum
  values: [mute, unmute]

- id: m_picture_mode
  label: M-Series Picture Mode
  type: enum
  values: [standard, soft, movie, vivid]
  notes: "Codes 0x07, 0x09, 0x0A, 0x08."

- id: m_source_state
  label: M-Series Current Source
  type: enum
  values: [hdmi1, hdmi2, dp, vga]

- id: wr_screen_state
  label: WR6/MR6 Screen State
  type: enum
  values: [off, on]

- id: wr_power_state
  label: WR6/MR6 Power State
  type: enum
  values: [on, off]
  notes: "00=on, FF=off in TV-status query."

- id: wr_mute_state
  label: WR6/MR6 Mute State
  type: enum
  values: [mute, unmute]

- id: wr_signal_state
  label: WR6/MR6 Signal State
  type: enum
  values: [no_signal, has_signal]

- id: wr_network_state
  label: WR6/MR6 Network State
  type: enum
  values: [disconnected, connected]

- id: wr_ac_power_on_state
  label: WR6/MR6 AC Power On State
  type: enum
  values: [power_on, last_mode, standby]

- id: wr_eye_protection_state
  label: WR6/MR6 Eye Protection State
  type: enum
  values: [off, on]

- id: wr_backlight_mode
  label: WR6/MR6 Backlight Mode
  type: enum
  values: [bright, soft, auto, stereo_freq_conv, comfort_freq_conv, custom]

- id: wr_sound_mode
  label: WR6/MR6 Sound Mode
  type: enum
  values: [standard, music, news, movie, sports, custom, voice, meeting]
  notes: "Codes 00, 01, 02, 08, 10, 20, 30, 40."

- id: wr_temperature
  label: WR6 Device Temperature (C)
  type: integer
  notes: "From C1 FE 00 00 query. Range not stated."
```

## Variables
```yaml
# Settable, continuous-valued controls documented in source.
- id: e_volume
  label: E-Series Volume
  type: integer
  range: [0, 100]

- id: e_brightness
  label: E-Series Brightness
  type: integer
  range: [0, 100]

- id: e_contrast
  label: E-Series Contrast
  type: integer
  range: [0, 100]

- id: e_sharpness_ip
  label: E-Series Sharpness (IP Control variant)
  type: integer
  range: [0, 100]

- id: e_balance
  label: E-Series Balance
  type: integer
  range: [-50, 50]
  notes: "OSD -50 to 50, wire value 0-100."

- id: m_volume
  label: M-Series Volume
  type: integer
  range: [0, 100]

- id: m_brightness
  label: M-Series Brightness
  type: integer
  range: null  # UNRESOLVED: range not stated in source

- id: m_contrast
  label: M-Series Contrast
  type: integer
  range: null  # UNRESOLVED: range not stated in source

- id: m_definition
  label: M-Series Definition (Sharpness)
  type: integer
  range: null  # UNRESOLVED: range not stated in source

- id: m_custom_backlight
  label: M-Series Custom Backlight Value
  type: integer
  range: null  # UNRESOLVED: range not stated in source

- id: wr_volume
  label: WR6/MR6 Volume
  type: integer
  range: [0, 100]

- id: wr_brightness
  label: WR6/MR6 Brightness
  type: integer
  range: [0, 100]

- id: wr_contrast
  label: WR6/MR6 Contrast
  type: integer
  range: [0, 100]

- id: wr_sharpness
  label: WR6/MR6 Sharpness
  type: integer
  range: [0, 100]

- id: wr_color_temperature
  label: WR6/MR6 Color Temperature
  type: integer
  range: [0, 100]

- id: wr_backlight_custom
  label: WR6/MR6 Custom Backlight
  type: integer
  range: [0, 30]

- id: wr_power_on_delay
  label: WR6 Power On Delay (seconds)
  type: integer
  range: [2, 255]
  notes: "00=off; otherwise 2-255 s."

- id: wr_device_temperature
  label: WR6 Device Temperature (C)
  type: integer
  range: null  # UNRESOLVED: range not stated in source
```

## Events
```yaml
# The source documents reply frames (solicited) but does not describe any
# unsolicited push notifications from the device.
# UNRESOLVED: no event/notification protocol described in source.
```

## Macros
```yaml
# No multi-step sequences described in source beyond per-cmd schedule setup
# (which is captured as discrete e_set_schedule / wr_set_schedule_* actions).
# UNRESOLVED: no multi-step macro sequences documented in source.
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset       # WR6/MR6/M-Series: restore factory settings
  - set_power           # hard power cycle
interlocks: []
# UNRESOLVED: source does not describe safety interlocks, fault behavior, or
# error-recovery sequences beyond the E-Series result-code table
# (0x00..0x04: completed / limit-over / cancelled / parse-error).
```

## Notes

**Model mismatch.** The user-provided target model `55U78QG` is a consumer U7-series ULED TV. The source document is titled "Hisense 85U7K — RS232 / IP Control Guide" and the body content covers four digital-signage / interactive-touch product lines (E-Series, M-Series, WR6CE/WR6BE, MR6DE/MR6DE-E). The 55U78QG is not explicitly mentioned. Operator should verify whether the 55U78QG shares the 85U7K control protocol before relying on this spec.

**Two distinct frame formats.**
- E-Series: `A6 {id} 00 00 00 {len} 01 {code} {data..} {xor}`. Header `A6`, reply header `21`. Checksum = XOR of all preceding bytes. Baud 115200.
- M-Series / WR6 / MR6: `DD FF {len} {cmd4} {id} {data..} {xor} BB CC`. Reply header `AB AB`, end `CD CD`. Checksum = XOR of length+command+id+data. Baud 9600.

**E-Series "IP Control" variants.** The source's "Note" column tags several E-Series commands (aspect ratio, video params with sharpness, remote lock, schedule, screen on/off, IR key) as "IP Control". This indicates the same `A6` frame can be transported over TCP/IP, but the source does not state which port.

**Power-on requirement.** E-Series power commands require the TV menu setting "Uart Wake = On".

**Source typos preserved.** WR6 "Query Screen Status" row in the source has a copy-paste error in the example payload (uses `C1100001` instead of `C1320000`). The opcode (`0x32`) is consistent with the corresponding E-Series query and is treated as correct.

**MR6 picture-mode and source-set differences vs. WR6.** MR6 picture mode and sharpness / color-temperature / noise-reduction command source-restriction lists differ (HDMI/PC/Type-c instead of DP/VGA/HDMI/PC/DVI). MR6 source-select codes also differ (1A/24/25/0C/1C) from WR6 (0C/0B/05/06/04). These are captured as separate actions.

**E-Series `0x18` opcode reuse.** Opcode `0x18` is used twice in E-Series with different parameter values: power off/on (`0x01`/`0x02`) and screen on/off + power off (`0x01`/`0x03`/`0x04`). Both are emitted as separate actions to avoid overloading.

<!-- UNRESOLVED: target model 55U78QG not present in source; TCP port not stated; E-Series vs M/WR/MR baud mismatch unresolvable without additional source. -->

## Provenance

```yaml
source_domains:
  - hisense.id
  - hisense-b2b.com
  - ltb.no
source_urls:
  - https://hisense.id/wp-content/uploads/2023/10/Hisense_RS232_DOC_V1.5-3-1.pdf
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - https://ltb.no/media/multicase/documents/hisense/dm66d/hcd_rs232_control_guide_v2.0.pdf
retrieved_at: 2026-05-14T10:38:46.017Z
last_checked_at: 2026-06-02T17:22:22.133Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:22:22.133Z
matched_actions: 121
action_count: 121
confidence: medium
summary: "All 121 spec actions verified against source; E/M/WR/MR protocol opcodes, frame structures, and baud rates confirmed. Transport parameters verified or properly marked UNRESOLVED. Bidirectional spec-source coverage is complete. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "target model 55U78QG not present in source; source covers 85U7K + E/M/WR/MR series."
- "E-Series documents 115200 baud; M/WR/MR document 9600 baud."
- "IP/TCP port not stated in source"
- "range not stated in source"
- "no event/notification protocol described in source."
- "no multi-step macro sequences documented in source."
- "source does not describe safety interlocks, fault behavior, or"
- "target model 55U78QG not present in source; TCP port not stated; E-Series vs M/WR/MR baud mismatch unresolvable without additional source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0

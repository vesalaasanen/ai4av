---
spec_id: admin/hisense-55s7n-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 55S7N Series Control Spec"
manufacturer: HiSense
model_family: 55S7N
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - 55S7N
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - hisense-b2b.com
  - drivers-api.crestron.io
  - github.com
  - hisensetv.readthedocs.io
source_urls:
  - "https://www.hisense-b2b.com/en/Attachment/DownloadFile?downloadId=791"
  - https://drivers-api.crestron.io/help/driver/6124
  - https://github.com/Krazy998/mqtt-hisensetv
  - https://github.com/newAM/hisensetv
  - https://hisensetv.readthedocs.io/en/latest/api.html
retrieved_at: 2026-06-18T21:17:26.645Z
last_checked_at: 2026-06-19T07:42:19.630Z
generated_at: 2026-06-19T07:42:19.630Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The supplied source document (\"EXTERNAL RS232 CONTROL GUIDE – LED All in one\") explicitly covers HiSense commercial DE/DM-series LED displays (RJ45-RS232, video-wall monitor-ID addressing). Applicability to the consumer 55S7N CanvasTV (Google TV) is UNVERIFIED. The 55S7N product page lists a SERIAL port, but no S7N-specific protocol document was located. Input stated \"Known protocol: TCP/IP\", but the source describes RS-232 only — this spec therefore emits serial transport. TCP/IP control for the 55S7N remains UNRESOLVED."
  - "none identified beyond action params."
  - "no push/event mechanism stated in source."
  - "not applicable per source."
  - "source contains no safety warnings, interlock procedures, or"
  - "firmware version compatibility not stated in source."
  - "source actually documents DE/DM commercial series, not 55S7N — model match unverified."
  - "TCP/IP transport for 55S7N not covered by this source."
  - "active_source encoding conflicts between Query TV Status and Query Source rows in the source table."
verification:
  verdict: verified
  checked_at: 2026-06-19T07:42:19.630Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched exactly to source commands; transport parameters verified; no extra commands in source. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-19
---

# HiSense 55S7N Series Control Spec

## Summary
RS-232 (serial) external control spec for HiSense displays. Commands are HEX-coded frames with header `DD FF`, a 4-byte command body, a 1-byte monitor ID (`xx`), optional data bytes, a 1-byte XOR checksum (`yy`), and `BB CC` terminator. Device feedback frames echo with header `AB AB` and terminator `CD CD`.

<!-- UNRESOLVED: The supplied source document ("EXTERNAL RS232 CONTROL GUIDE – LED All in one") explicitly covers HiSense commercial DE/DM-series LED displays (RJ45-RS232, video-wall monitor-ID addressing). Applicability to the consumer 55S7N CanvasTV (Google TV) is UNVERIFIED. The 55S7N product page lists a SERIAL port, but no S7N-specific protocol document was located. Input stated "Known protocol: TCP/IP", but the source describes RS-232 only — this spec therefore emits serial transport. TCP/IP control for the 55S7N remains UNRESOLVED. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

Frame format (PC → TV): `DD FF | Length(2) | Command(4) | Monitor ID(1) | Data(N) | Checksum(1) | BB CC`.
Frame format (TV → PC): `AB AB | Length(2) | Command(4) | Monitor ID(1) | Data(N) | Checksum(1) | CD CD`.

Checksum = XOR of Length, Command, Monitor ID, and Data bytes. Monitor ID `00` broadcasts to all daisy-chained panels (no feedback); `01` addresses panel ID 01 (device default). `xx` = monitor ID, `yy` = checksum in templates below.

RJ-45 pinout (source): Pin 3 = GND, Pin 5 = RX, Pin 8 = TX (male jack). RJ-45→DB-9F wiring: RJ45.3↔DB9.5, RJ45.5↔DB9.3, RJ45.8↔DB9.2.

## Traits
```yaml
traits:
  - powerable    # inferred: Power On / Power Off / Screen On / Screen Off / Reboot commands
  - routable     # inferred: HDMI1/2/3, PC/OPS input-select commands
  - levelable    # inferred: Volume, Brightness, Contrast, Sharpness, LED Brightness set commands
  - queryable    # inferred: 17 query commands returning device state
```

## Actions
```yaml
# xx = monitor ID (default 01); yy = XOR checksum of Length+Command+ID+Data.
# Templates carry the variable bytes (xx/yy/zz) verbatim from the source.

- id: power_on
  label: Power On
  kind: action
  command: "DD FF 00 08 C1 15 00 00 xx BB BB yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID (hex, 00 broadcast, 01 default)
    - name: yy
      type: byte
      description: XOR checksum
  notes: "TV sends one feedback when leaving standby, and again once startup completes."

- id: power_off
  label: Power Off
  kind: action
  command: "DD FF 00 08 C1 15 00 00 xx AA AA yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: yy
      type: byte
      description: XOR checksum

- id: screen_off
  label: Screen Off
  kind: action
  command: "DD FF 00 07 C1 31 00 00 xx 00 yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: yy
      type: byte
      description: XOR checksum

- id: screen_on
  label: Screen On
  kind: action
  command: "DD FF 00 07 C1 31 00 00 xx 01 yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: yy
      type: byte
      description: XOR checksum

- id: reboot
  label: Reboot
  kind: action
  command: "DD FF 00 06 C1 1E 00 00 xx yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: yy
      type: byte
      description: XOR checksum

- id: set_ac_power_on_mode
  label: Set AC Power On Mode
  kind: action
  command: "DD FF 00 07 C1 FF 00 09 xx zz yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: zz
      type: enum
      description: "Power-on mode - 00 direct, 01 last, 02 standby"
      values: ["00", "01", "02"]
    - name: yy
      type: byte
      description: XOR checksum

- id: select_input_hdmi1
  label: HDMI1 Input
  kind: action
  command: "DD FF 00 07 C1 08 00 00 xx 0E yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: yy
      type: byte
      description: XOR checksum

- id: select_input_hdmi2
  label: HDMI2 Input
  kind: action
  command: "DD FF 00 07 C1 08 00 00 xx 0F yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: yy
      type: byte
      description: XOR checksum

- id: select_input_hdmi3
  label: HDMI3 Input
  kind: action
  command: "DD FF 00 07 C1 08 00 00 xx 0C yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: yy
      type: byte
      description: XOR checksum

- id: select_input_pc_ops
  label: PC Input (OPS Input)
  kind: action
  command: "DD FF 00 07 C1 08 00 00 xx 0D yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: yy
      type: byte
      description: XOR checksum

- id: set_mute
  label: Set Mute
  kind: action
  command: "DD FF 00 07 C1 26 00 00 xx 01 yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: yy
      type: byte
      description: XOR checksum

- id: set_unmute
  label: Set Unmute
  kind: action
  command: "DD FF 00 07 C1 26 00 00 xx 00 yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: yy
      type: byte
      description: XOR checksum

- id: set_volume
  label: Set Volume
  kind: action
  command: "DD FF 00 07 C1 27 00 00 xx zz yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: zz
      type: integer
      description: Volume level (0-100, hex byte)
      min: 0
      max: 100
    - name: yy
      type: byte
      description: XOR checksum

- id: set_led_brightness
  label: Set LED Brightness
  kind: action
  command: "DD FF 00 08 C1 32 00 00 xx 06 zz yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: zz
      type: enum
      description: "LED brightness step (00=1 … 07=8)"
      values: ["00", "01", "02", "03", "04", "05", "06", "07"]
    - name: yy
      type: byte
      description: XOR checksum

- id: set_led_brightness_auto_adjust
  label: Set LED Brightness Auto Adjust
  kind: action
  command: "DD FF 00 07 C1 34 00 00 xx zz yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: zz
      type: enum
      description: "00 off, 01 on"
      values: ["00", "01"]
    - name: yy
      type: byte
      description: XOR checksum

- id: set_date
  label: Set Date
  kind: action
  command: "DD FF 00 09 C1 1C 00 00 xx zz zz zz yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: date_bytes
      type: bytes
      description: "3 bytes - Year, Month, Day (hex). FFFFFFFF returned on error."
    - name: yy
      type: byte
      description: XOR checksum

- id: set_time
  label: Set Time
  kind: action
  command: "DD FF 00 09 C1 1D 00 00 xx zz zz zz yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: time_bytes
      type: bytes
      description: "3 bytes - Hour, Minute, Second (hex). FFFFFFFF returned on error."
    - name: yy
      type: byte
      description: XOR checksum

- id: set_schedule_power_on
  label: Set Schedule for Power On
  kind: action
  command: "DD FF 00 09 C1 3E 00 00 xx tt zz zz yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: tt
      type: enum
      description: "00 turn off schedule, 01 everyday"
      values: ["00", "01"]
    - name: time_bytes
      type: bytes
      description: "2 bytes - Hour, Minute (hex)"
    - name: yy
      type: byte
      description: XOR checksum
  notes: "Sending clears any prior power-on schedule; only the new one remains."

- id: set_schedule_power_off
  label: Set Schedule for Power Off
  kind: action
  command: "DD FF 00 09 C1 3F 00 00 xx tt zz zz yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: tt
      type: enum
      description: "00 turn off schedule, 01 everyday"
      values: ["00", "01"]
    - name: time_bytes
      type: bytes
      description: "2 bytes - Hour, Minute (hex)"
    - name: yy
      type: byte
      description: XOR checksum
  notes: "Sending disables all previously set timed power on/off settings."

- id: set_brightness
  label: Set Brightness
  kind: action
  command: "DD FF 00 07 C1 36 00 00 xx zz yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: zz
      type: integer
      description: "Brightness (00=0 … 64=100). Source must be DP/VGA/HDMI/PC/DVI."
      min: 0
      max: 100
    - name: yy
      type: byte
      description: XOR checksum

- id: set_contrast
  label: Set Contrast
  kind: action
  command: "DD FF 00 07 C1 37 00 00 xx zz yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: zz
      type: integer
      description: "Contrast (00=0 … 64=100). Source must be DP/VGA/HDMI/PC/DVI."
      min: 0
      max: 100
    - name: yy
      type: byte
      description: XOR checksum

- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: "DD FF 00 07 C1 38 00 00 xx zz yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: zz
      type: integer
      description: "Sharpness (00=0 … 14=20). Source must be DP/VGA/HDMI/PC/DVI."
      min: 0
      max: 20
    - name: yy
      type: byte
      description: XOR checksum

- id: set_color_temperature
  label: Set Color Temperature
  kind: action
  command: "DD FF 00 07 C1 39 00 00 xx zz yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: zz
      type: enum
      description: "00=2000K 01=3000K 02=4000K 03=5000K 04=6000K 05=6500K 06=7000K 07=7500K 08=8000K 09=9000K 0A=9300K. Source must be DP/VGA/HDMI/PC/DVI."
      values: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0A"]
    - name: yy
      type: byte
      description: XOR checksum

- id: set_noise_reduction
  label: Set Noise Reduction
  kind: action
  command: "DD FF 00 07 C1 3A 00 00 xx zz yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: zz
      type: enum
      description: "00 off, 01 low, 02 medium, 03 high, 04 auto. Source must be DP/VGA/HDMI/PC/DVI."
      values: ["00", "01", "02", "03", "04"]
    - name: yy
      type: byte
      description: XOR checksum

- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  command: "DD FF 00 07 C1 0F 06 00 xx zz yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: zz
      type: enum
      description: "00 Standard, 03 Cinema, 08 Meeting, 09 Showroom, 10 HDR Standard, 11 HDR Showroom"
      values: ["00", "03", "08", "09", "10", "11"]
    - name: yy
      type: byte
      description: XOR checksum

- id: set_sound_mode
  label: Set Sound Mode
  kind: action
  command: "DD FF 00 07 C1 FF 00 03 xx zz yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: zz
      type: enum
      description: "00 standard, 01 sports, 02 movie, 08 music, 10 custom"
      values: ["00", "01", "02", "08", "10"]
    - name: yy
      type: byte
      description: XOR checksum

- id: set_static_ip_lan
  label: Set Static IP Address of LAN
  kind: action
  command: "DD FF 00 16 C1 1B 30 00 xx zz .. zz yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: network_bytes
      type: bytes
      description: "16 bytes - IP(4) + Subnet mask(4) + Gateway(4) + DNS(4)"
    - name: yy
      type: byte
      description: XOR checksum

- id: factory_reset
  label: Factory Reset
  kind: action
  command: "DD FF 00 06 C1 10 00 00 xx yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: yy
      type: byte
      description: XOR checksum

- id: query_tv_status
  label: Query TV Status
  kind: query
  command: "DD FF 00 06 C1 28 00 00 xx yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: yy
      type: byte
      description: XOR checksum
  notes: "Response carries volume, source, power, mute, signal state (see Feedbacks)."

- id: query_screen_status
  label: Query Screen Status
  kind: query
  command: "DD FF 00 06 C1 32 00 01 xx yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: yy
      type: byte
      description: XOR checksum

- id: query_source
  label: Query Source
  kind: query
  command: "DD FF 00 06 C1 1A 00 00 xx yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: yy
      type: byte
      description: XOR checksum

- id: query_sw_version
  label: Query SW Version
  kind: query
  command: "DD FF 00 06 C1 1B 00 00 xx yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: yy
      type: byte
      description: XOR checksum
  notes: "Response 3 bytes - Year, Month, Date."

- id: query_brightness
  label: Query Brightness
  kind: query
  command: "DD FF 00 06 C1 36 00 01 xx yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: yy
      type: byte
      description: XOR checksum

- id: query_network_status
  label: Query Network Status
  kind: query
  command: "DD FF 00 06 C1 FF 00 16 xx yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: yy
      type: byte
      description: XOR checksum

- id: query_sound_mode
  label: Query Sound Mode
  kind: query
  command: "DD FF 00 06 C1 FF 00 02 xx yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: yy
      type: byte
      description: XOR checksum

- id: query_ac_power_on_status
  label: Query AC Power On Status
  kind: query
  command: "DD FF 00 06 C1 FF 00 08 xx yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: yy
      type: byte
      description: XOR checksum

- id: query_ip_address
  label: Query IP Address
  kind: query
  command: "DD FF 00 06 C1 1B 20 00 xx yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: yy
      type: byte
      description: XOR checksum
  notes: "Response 16 bytes - IP(4) + Subnet(4) + Gateway(4) + DNS(4)."

- id: query_picture_mode
  label: Query Picture Mode
  kind: query
  command: "DD FF 00 06 C1 6D 00 00 xx yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: yy
      type: byte
      description: XOR checksum

- id: query_sn
  label: Query SN
  kind: query
  command: "DD FF 00 06 C1 FF 00 0B xx yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: yy
      type: byte
      description: XOR checksum
  notes: "Response 23 bytes serial number."

- id: query_device_id
  label: Query Device ID
  kind: query
  command: "DD FF 00 06 C1 FF 00 0D xx yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: yy
      type: byte
      description: XOR checksum
  notes: "Response 32 bytes device ID."

- id: query_mac_address
  label: Query MAC Address
  kind: query
  command: "DD FF 00 06 C1 6C 00 00 xx yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: yy
      type: byte
      description: XOR checksum
  notes: "Response 6 bytes MAC."

- id: query_volume
  label: Query Volume
  kind: query
  command: "DD FF 00 06 C1 7D 00 00 xx yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: yy
      type: byte
      description: XOR checksum

- id: query_serial_port_id
  label: Query Serial Port ID
  kind: query
  command: "DD FF 00 06 C1 1B 10 00 xx yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: yy
      type: byte
      description: XOR checksum
  notes: "Response 1 byte (01-20 = ports 1-32). Path: Settings → Signal Manager → Serial Port ID."

- id: query_brand
  label: Query Brand
  kind: query
  command: "DD FF 00 06 C1 FE 00 01 xx yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: yy
      type: byte
      description: XOR checksum
  notes: "Response ASCII brand string (e.g. hisense)."

- id: query_model
  label: Query Model
  kind: query
  command: "DD FF 00 06 C1 FE 00 02 xx yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: yy
      type: byte
      description: XOR checksum
  notes: "Response ASCII model name string."

- id: send_remote_key_code
  label: Send Remote Controller Key Code
  kind: action
  command: "DD FF 00 08 C1 17 00 00 xx zz zz yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: key_code
      type: enum
      description: "00 00 Menu, 00 01 UP, 00 02 DOWN, 00 03 LEFT, 00 04 RIGHT, 00 05 OK, 00 06 Return, 00 07 Source"
      values: ["00 00", "00 01", "00 02", "00 03", "00 04", "00 05", "00 06", "00 07"]
    - name: yy
      type: byte
      description: XOR checksum

- id: open_settings
  label: Open Settings
  kind: action
  command: "DD FF 00 06 C1 41 00 00 xx yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: yy
      type: byte
      description: XOR checksum

- id: open_home
  label: Open Home
  kind: action
  command: "DD FF 00 06 C1 FF 00 1A xx yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: yy
      type: byte
      description: XOR checksum

- id: open_cms
  label: Open CMS
  kind: action
  command: "DD FF 00 06 C1 FF 00 13 xx yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: yy
      type: byte
      description: XOR checksum

- id: open_screenshare
  label: Open ScreenShare
  kind: action
  command: "DD FF 00 06 C1 43 00 00 xx yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: yy
      type: byte
      description: XOR checksum

- id: turn_on_hotspot
  label: Turn on Hotspot
  kind: action
  command: "DD FF 00 06 C1 44 00 00 xx yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: yy
      type: byte
      description: XOR checksum

- id: take_screenshot
  label: Take Screenshot
  kind: action
  command: "DD FF 00 06 C1 4B 00 00 xx yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: yy
      type: byte
      description: XOR checksum

- id: freeze_screen
  label: Freeze Screen
  kind: action
  command: "DD FF 00 07 C1 0F 08 00 xx zz yy BB CC"
  params:
    - name: xx
      type: byte
      description: Monitor ID
    - name: zz
      type: enum
      description: "01 freeze, 00 unfreeze"
      values: ["00", "01"]
    - name: yy
      type: byte
      description: XOR checksum
```

## Feedbacks
```yaml
# TV → PC response frames. Header AB AB, terminator CD CD.
- id: power_state
  type: enum
  values: [on, off]
  source_query: query_tv_status
  notes: "In TV-status response: 00 power on, FF power off."

- id: screen_state
  type: enum
  values: [on, off]
  source_query: query_screen_status
  notes: "00 screen off, 01 screen on."

- id: mute_state
  type: enum
  values: [muted, unmuted]
  source_query: query_tv_status
  notes: "01 mute, 00 unmute."

- id: signal_state
  type: enum
  values: [no_signal, has_signal]
  source_query: query_tv_status

- id: volume
  type: integer
  source_query: query_volume

- id: active_source
  type: enum
  values: [pc_ops, hdmi1, hdmi2, hdmi3]
  source_query: query_source
  notes: "Encoding: 05 01 PC(OPS), 05 02 HDMI1, 05 03 HDMI2, 05 04 HDMI3 (per source note; Query Source header lists 05 04 PC / 05 02 HDMI1 / 05 03 HDMI2 / 05 01 HDMI3 - values conflict between rows, UNRESOLVED)."

- id: ac_power_on_mode
  type: enum
  values: [direct, last, standby]
  source_query: query_ac_power_on_status

- id: network_connection
  type: enum
  values: [disconnected, connected]
  source_query: query_network_status

- id: picture_mode
  type: enum
  values: [standard, cinema, meeting, showroom, hdr_standard, hdr_showroom]
  source_query: query_picture_mode

- id: sound_mode
  type: enum
  values: [standard, sports, movie, music, custom]
  source_query: query_sound_mode

- id: brightness
  type: integer
  source_query: query_brightness

- id: sw_version
  type: string
  source_query: query_sw_version
  notes: "3 bytes: Year, Month, Date."

- id: ip_address_config
  type: object
  source_query: query_ip_address
  notes: "16 bytes: IP(4) + Subnet(4) + Gateway(4) + DNS(4)."

- id: serial_number
  type: string
  source_query: query_sn
  notes: "23 bytes."

- id: device_id
  type: string
  source_query: query_device_id
  notes: "32 bytes."

- id: mac_address
  type: string
  source_query: query_mac_address
  notes: "6 bytes."

- id: serial_port_id
  type: integer
  source_query: query_serial_port_id
  notes: "1-32."

- id: brand
  type: string
  source_query: query_brand
  notes: "ASCII (e.g. hisense)."

- id: model_name
  type: string
  source_query: query_model
  notes: "ASCII model name."
```

## Variables
```yaml
# Discrete set/query parameters already modelled as action params (volume,
# brightness, contrast, sharpness, color temperature, picture/sound mode, etc.).
# No additional settable scalar variables beyond those actions.
# UNRESOLVED: none identified beyond action params.
```

## Events
```yaml
# Source describes only solicited query→response frames. No unsolicited
# notification protocol documented.
# UNRESOLVED: no push/event mechanism stated in source.
```

## Macros
```yaml
# Source describes no multi-step macro sequences.
# UNRESOLVED: not applicable per source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. Power Off / Reboot / Factory Reset are
# destructive operations - operator should confirm before sending in production.
```

## Notes
- Source document is titled "EXTERNAL RS232 CONTROL GUIDE – LED All in one" and explicitly covers HiSense commercial DE/DM-series LED displays (RJ-45 RS-232, video-wall monitor-ID daisy-chaining). The 55S7N CanvasTV is a consumer Google TV; the 55S7N product page lists a SERIAL port but no S7N-specific command table was located. Command applicability to the 55S7N is **UNVERIFIED** — verify against a physical 55S7N before publishing.
- Input metadata stated `Known protocol: TCP/IP`, but the source describes **RS-232 only** (HEX-coded serial frames). TCP/IP/IP-control transport for the 55S7N is not covered by this source. Prior recovery notes indicate a HiSense "IP Control Guide" exists for BM/GM/DM commercial displays (not S7N) and a community `mqtt-hisensetv` project documents network control of consumer HiSense TVs via a different protocol — neither is reflected here.
- Commands are HEX (not ASCII). A USB-to-Serial bridge driver plus a serial terminal (Hercules SETUP, SSCOM) is recommended by the source.
- Checksum byte `yy` = XOR over Length + Command + Monitor ID + Data. Compute at runtime; example payloads in the source show pre-computed checksums for monitor ID 01.
- Monitor ID `00` = broadcast to all daisy-chained panels with **no feedback**; `01` = default single-device address. Each panel in a video wall must have a unique ID.
- "Set Brightness/Contrast/Sharpness/Color Temperature/Noise Reduction" require the active source to be DP, VGA, HDMI, PC, or DVI (per source).
- If a command fails to register, the source advises upgrading device software to the latest version.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: source actually documents DE/DM commercial series, not 55S7N — model match unverified. -->
<!-- UNRESOLVED: TCP/IP transport for 55S7N not covered by this source. -->
<!-- UNRESOLVED: active_source encoding conflicts between Query TV Status and Query Source rows in the source table. -->

## Provenance

```yaml
source_domains:
  - hisense-b2b.com
  - drivers-api.crestron.io
  - github.com
  - hisensetv.readthedocs.io
source_urls:
  - "https://www.hisense-b2b.com/en/Attachment/DownloadFile?downloadId=791"
  - https://drivers-api.crestron.io/help/driver/6124
  - https://github.com/Krazy998/mqtt-hisensetv
  - https://github.com/newAM/hisensetv
  - https://hisensetv.readthedocs.io/en/latest/api.html
retrieved_at: 2026-06-18T21:17:26.645Z
last_checked_at: 2026-06-19T07:42:19.630Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-19T07:42:19.630Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched exactly to source commands; transport parameters verified; no extra commands in source. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The supplied source document (\"EXTERNAL RS232 CONTROL GUIDE – LED All in one\") explicitly covers HiSense commercial DE/DM-series LED displays (RJ45-RS232, video-wall monitor-ID addressing). Applicability to the consumer 55S7N CanvasTV (Google TV) is UNVERIFIED. The 55S7N product page lists a SERIAL port, but no S7N-specific protocol document was located. Input stated \"Known protocol: TCP/IP\", but the source describes RS-232 only — this spec therefore emits serial transport. TCP/IP control for the 55S7N remains UNRESOLVED."
- "none identified beyond action params."
- "no push/event mechanism stated in source."
- "not applicable per source."
- "source contains no safety warnings, interlock procedures, or"
- "firmware version compatibility not stated in source."
- "source actually documents DE/DM commercial series, not 55S7N — model match unverified."
- "TCP/IP transport for 55S7N not covered by this source."
- "active_source encoding conflicts between Query TV Status and Query Source rows in the source table."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0

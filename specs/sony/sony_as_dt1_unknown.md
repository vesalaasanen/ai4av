---
spec_id: admin/sony-as-dt1
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony AS-DT1 Control Spec"
manufacturer: Sony
model_family: AS-DT1
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - AS-DT1
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sony.jp
  - docs.px4.io
  - github.com
source_urls:
  - https://www.sony.jp/lidar-depth-sensor/download/pdf/UsersGuide_AS-DT1.pdf
  - https://docs.px4.io/main/en/sensor/sony_asdt1
  - https://github.com/SamuelSRI/as_dt1_ros2_driver
  - https://www.sony.jp/lidar-depth-sensor/
retrieved_at: 2026-07-04T14:53:01.984Z
last_checked_at: 2026-07-07T12:41:20.672Z
generated_at: 2026-07-07T12:41:20.672Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is an excerpt of the Japanese User's Guide only; the \"API manual\" (referenced repeatedly) was not available, so per-command parameter semantics, response schemas, and mode-availability matrix cells are incomplete. Checkmark cells in the command-availability table were not preserved in extraction, so per-mode availability of each command could not be recovered."
  - "start-bit count not modelled in this schema; source states 1 start bit."
  - "character encoding / line terminator not explicitly stated; CR (0x0d) shown in padding example."
  - "response schema not shown in source."
  - "response schema not shown."
  - "availability per mode and response schema not in source excerpt."
  - "exact read vs set argument syntax not stated in excerpt."
  - "address/length argument syntax not stated."
  - "enum values not stated in excerpt."
  - "enum values not stated."
  - "argument syntax not stated."
  - "full enum not stated."
  - "range/units not stated."
  - "units and valid range not explicitly stated."
  - "units not stated."
  - "full enum (edge selections) not stated."
  - "full enum (e.g. fall) not stated."
  - "valid range not stated."
  - "format/length not stated."
  - "format not stated."
verification:
  verdict: verified
  checked_at: 2026-07-07T12:41:20.672Z
  matched_actions: 48
  action_count: 48
  confidence: medium
  summary: "All 48 spec actions matched verbatim in source; transport parameters fully verified; source commands entirely represented. (20 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-04
---

# Sony AS-DT1 Control Spec

## Summary
The Sony AS-DT1 is a dToF (direct Time-of-Flight) LiDAR depth sensor with an integrated IMU (accelerometer ±4 G, gyroscope ±500 dps). This spec covers its text-based serial command interface, reachable over two physical transports: USB CDC (enumerates as a COM port on Windows hosts) and a TTL-level UART on the 8-pin rear connector (pins 5=TX, 6=RX). Control covers single-shot ranging, periodic ranging, ranging-mode/range/format configuration stored in non-volatile memory, obstacle detection, timestamp synchronisation, IMU readout, diagnostics, and firmware-update service commands. The command catalogue is large; detailed parameter semantics are deferred to a separate "API manual" referenced but not included in this source.

<!-- UNRESOLVED: source is an excerpt of the Japanese User's Guide only; the "API manual" (referenced repeatedly) was not available, so per-command parameter semantics, response schemas, and mode-availability matrix cells are incomplete. Checkmark cells in the command-availability table were not preserved in extraction, so per-mode availability of each command could not be recovered. -->

## Transport
```yaml
# Two physical transports, both serial from the AI4AV taxonomy:
#   1. USB CDC  - enumerates as COM port on Windows; runs at USB-defined max
#      speed, no baud/start/stop config required by host.
#   2. UART     - TTL-level (NOT RS-232), 8-pin JST GHR-08V-S connector,
#      pins 5 (TX) / 6 (RX). Explicit serial config below applies to UART only.
# NOTE: UART port is NOT RS-232 / RS-422 compatible - external level
# conversion required. UART port is non-isolated.
protocols:
  - serial
serial:
  baud_rate: 115200  # default; source also lists 230400, 460800, 921600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  # UNRESOLVED: start-bit count not modelled in this schema; source states 1 start bit.
  # UNRESOLVED: character encoding / line terminator not explicitly stated; CR (0x0d) shown in padding example.
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# Evidence-based traits:
# - queryable: many status/query commands (ver, sensorinfo, ustatus, flshow, diag, errinfo, cstatus, etc.)
# - levelable : lddlout (laser intensity), gain (SPAD gain), fsync/flfsync (interval), flobs/obs (detection windows)
# NOTE: this device is a sensor, not a routable AV sink/source, so [routable] does NOT apply.
# NOTE: [powerable] not set - no power-on/off command; device is USB/bus powered (VCC 12-24 V external option) with no serial power command.
traits:
  - queryable  # inferred from query command examples
  - levelable  # inferred from interval/intensity/gain/window-setting commands
```

## Actions
```yaml
# CRITICAL - UART 16-byte padding rule:
#   The UART port uses a 16-byte FIFO. When sending serial commands over UART,
#   pad the command (including terminator) with space chars (0x20) so total
#   length is a multiple of 16 bytes. Worked example from source:
#     "flstart cdc   \r"  -> bytes 66 6C 73 74 61 72 74 20 63 64 63 20 20 20 0d
#   (15 bytes shown; pad to 16). This padding applies to UART only; USB CDC
#   does not require it (source does not state a USB CDC framing rule).
#
# CRITICAL - payload verbatim policy:
#   Where the source shows a literal command string or example, it is copied
#   verbatim. Where only the command name is listed (table rows with no
#   example), the `command:` field carries the bare mnemonic and params are
#   marked UNRESOLVED pending the API manual.
#
# Coverage: all 46 commands enumerated from the source's command table +
# descriptive sections ("?" help + 45 named commands). Per-mode (update/cdc/
# extuart/hist/inten) availability matrix cells were not preserved in
# extraction - marked UNRESOLVED per command rather than guessed.

# --- Help / info queries ----------------------------------------------------
- id: help_list
  label: Command List
  kind: query
  command: "?"
  params: []
  notes: "Displays serial command list and brief descriptions."

- id: ver
  label: Version Info
  kind: query
  command: "ver"
  params: []
  notes: "Returns firmware version, serial number, hours meter. Example response: 'ver dToF CDC Version 1.000 B999 ... model:AS-DT1 serial:1000001 ope:19.2(H) shot:2779(k)'"

- id: ustatus
  label: USB Hub Status
  kind: query
  command: "ustatus"
  params: []
  notes: "Displays internal USB hub operating state. Example: 'ustatus SS SelfPwr Hub UCur Default Hub DCur 1.5A'"

- id: cstatus
  label: Communication Status
  kind: query
  command: "cstatus"
  params: []
  notes: "Displays current communication method and speed."
  # UNRESOLVED: response schema not shown in source.

- id: sensorinfo
  label: Sensor Module Info
  kind: query
  command: "sensorinfo"
  params: []
  notes: "Displays fitted sensor-module serial, module ID, FMTVER, modelname, manufacturing/facility dates, equipment ver, facility num, laser lot."

- id: findprg
  label: Firmware Info
  kind: query
  command: "findprg"
  params: []
  notes: "Displays info on programmed firmware."
  # UNRESOLVED: response schema not shown.

- id: flshow
  label: Non-Volatile Settings List
  kind: query
  command: "flshow"
  params: []
  notes: "Lists next-boot non-volatile settings. Example: 'flshow flstart update flmode 30mstd flfsync 0 flhistfsync 500 flformat ascii fluart 115200 fltrgin disable fltrgout disable fltsclk rise fltspreset rise flobs 0 0 flbank 1 flled on'. In update mode only factory defaults are shown; switch to cdc/extuart for full list."

- id: license
  label: Software License
  kind: query
  command: "license"
  params: []
  notes: "Displays software license information."

- id: errinfo
  label: Error Log
  kind: query
  command: "errinfo"
  params: []
  notes: "Displays stored abnormal-state records: Error info, MIPI error, MIPI status counters, sensor overheat info (T>70degC seconds, maxT)."

- id: diag
  label: Self Diagnostic
  kind: query
  command: "diag"
  params: []
  notes: "Runs self-diagnostic and prints result. Normal: 'diag Diag OK'. Fault: 'diag Diag NG FLASH xx IMU xx SENSOR xx EEPROM xx' - device needs repair."

- id: imuval
  label: IMU Measurement Read
  kind: query
  command: "imuval"
  params: []
  notes: "Reads IMU (accelerometer ±4 G, gyroscope ±500 dps) measurement values. Sampled ~10 ms intervals on IMU's own clock."
  # UNRESOLVED: availability per mode and response schema not in source excerpt.

- id: mpinfo
  label: Measurement Point Layout
  kind: query
  command: "mpinfo"
  params: []
  notes: "Ranging-point arrangement info."

- id: svminfo
  label: Measurement Direction Info
  kind: query
  command: "svminfo"
  params: []
  notes: "Per-point ranging-direction info."

- id: serial_read
  label: Serial Number Read
  kind: query
  command: "serial"
  params: []
  notes: "Displays device serial number (set variant is `serial_set`)."
  # UNRESOLVED: exact read vs set argument syntax not stated in excerpt.

- id: hrs_read
  label: Hours Meter / Laser Use Count Read
  kind: query
  command: "hrs"
  params: []
  notes: "Displays hours meter and laser use count (set variant is `hrs_set`)."

- id: userrd
  label: User NV Area Read
  kind: query
  command: "userrd"
  params: []
  notes: "Reads from user non-volatile area."
  # UNRESOLVED: address/length argument syntax not stated.

# --- Ranging execution ------------------------------------------------------
- id: trigger_single
  label: Single Ranging
  kind: action
  command: "t"
  params: []
  notes: "Executes one ranging pass over USB CDC or UART. Ignored if ranging already in progress. This is the command-trigger method."

- id: fsync
  label: Periodic Ranging (Internal Trigger)
  kind: action
  command: "fsync {interval}"
  params:
    - name: interval
      type: integer
      description: "Ranging repeat interval in 0.01 ms units (e.g. 100 = 1 ms). Source: 'fsyncコマンドを使用し、引数で指定した間隔（0.01 ms単位）で測距を繰り返します'."
  notes: "Repeats ranging at the given interval on the device's own clock (internal-trigger method). Disable value UNRESOLVED - source mentions disable is possible but does not state the literal."

- id: trgin
  label: Trigger In Function Setting (runtime)
  kind: action
  command: "trgin {config}"
  params:
    - name: config
      type: string
      description: "Trigger In function configuration; source states rising/falling edge selection and disable are possible but does not enumerate literal values."
      # UNRESOLVED: enum values not stated in excerpt.
  notes: "Configures the 8-pin Trigger In pin (pin 3) for external-trigger ranging (external-trigger method)."

- id: trgout
  label: Trigger Out Setting (runtime)
  kind: action
  command: "trgout {config}"
  params:
    - name: config
      type: string
      description: "Trigger Out pin function configuration."
      # UNRESOLVED: enum values not stated.
  notes: "Configures Trigger Out pin (pin 4) pulse output. Source shows timing: rise1st ~1 ms, riselast ~30 ms."

- id: ts
  label: Timestamp / Preset Register Setting
  kind: action
  command: "ts {config}"
  params:
    - name: config
      type: string
      description: "Timestamp and preset-register configuration."
      # UNRESOLVED: argument syntax not stated.
  notes: "Configures 32-bit timestamp counter sourced from TS Clk (max 1 kHz) / TS Preset pins (pins 7, 8)."

- id: obs
  label: Obstacle Detection Setting (runtime)
  kind: action
  command: "obs {min} {max}"
  params:
    - name: min
      type: integer
      description: "Minimum distance in mm."
    - name: max
      type: integer
      description: "Maximum distance in mm (0 disables that bound)."
  notes: "Sets obstacle-detection window at runtime. Same semantics as flobs: range entry (min<max), near-crossing (min=0), far-crossing (max=0), exit-window (min>max). Detection raises Trigger Out + orange status LED."

- id: format
  label: Ranging Output Format (runtime)
  kind: action
  command: "format {fmt}"
  params:
    - name: fmt
      type: string
      description: "Output format; source names 'ascii' and 'binary' as valid values."
      # UNRESOLVED: full enum not stated.
  notes: "Sets ranging-result output format. Source warns: at 115200/230400 bps or on slow hosts, ascii/binary format may drop frames or slow framerate."

- id: lddlout
  label: Laser Intensity (Intensity Mode)
  kind: action
  command: "lddlout {level}"
  params:
    - name: level
      type: integer
      description: "Laser light intensity for intensity mode."
      # UNRESOLVED: range/units not stated.
  notes: "Intensity-mode laser output intensity setting."

- id: gain
  label: SPAD Output Gain (Intensity Mode)
  kind: action
  command: "gain {value}"
  params:
    - name: value
      type: integer
      description: "SPAD output display gain adjustment."
      # UNRESOLVED: range/units not stated.
  notes: "Intensity-mode SPAD output gain adjust."

# --- Non-volatile (boot) configuration -------------------------------------
- id: flstart
  label: Boot Ranging Mode
  kind: action
  command: "flstart {mode}"
  params:
    - name: mode
      type: string
      description: "Next-boot ranging mode. Enum from source: update | cdc | extuart | hist | inten."
      enum: [update, cdc, extuart, hist, inten]
  notes: "Writes next-boot ranging mode to non-volatile memory. Takes effect after `reboot` or power cycle. Source example: 'flstart cdc > reboot'."

- id: flmode
  label: Boot Ranging Range
  kind: action
  command: "flmode {range}"
  params:
    - name: range
      type: string
      description: "Next-boot ranging range. Values named in source: 30MSTD | 30M15F | 30M30F | 20M | 40M."
      enum: [30MSTD, 30M15F, 30M30F, 20M, 40M]
  notes: "Boot ranging-range setting. Per-range output resolutions (histogram mode): 20M=800x504, 30MSTD=800x252, 30M15F=800x252, 30M30F=800x126, 40M=800x252."

- id: flfsync
  label: Boot Periodic Ranging Interval (cdc/extuart)
  kind: action
  command: "flfsync {interval}"
  params:
    - name: interval
      type: integer
      description: "Auto ranging repeat interval; units UNRESOLVED (likely 0.01 ms matching fsync). Default 0 per flshow example."
      # UNRESOLVED: units and valid range not explicitly stated.
  notes: "Boot-time auto-interval ranging setting for cdc/extuart boot modes."

- id: flhistfsync
  label: Boot Histogram Ranging Interval
  kind: action
  command: "flhistfsync {interval}"
  params:
    - name: interval
      type: integer
      description: "Ranging interval for histogram mode. Default 500 per flshow example."
      # UNRESOLVED: units not stated.
  notes: "Histogram-mode ranging-interval setting."

- id: flformat
  label: Boot Ranging Output Format
  kind: action
  command: "flformat {fmt}"
  params:
    - name: fmt
      type: string
      description: "Boot ranging output format. 'ascii' seen in flshow example."
      # UNRESOLVED: full enum not stated.
  notes: "Boot-time ranging-result output format setting."

- id: fluart
  label: Boot UART Bitrate
  kind: action
  command: "fluart {rate}"
  params:
    - name: rate
      type: integer
      description: "Boot UART bitrate. Enum from source: 115200 | 230400 | 460800 | 921600. Default 115200."
      enum: [115200, 230400, 460800, 921600]
  notes: "Boot UART bitrate. Applies only when boot ranging mode uses UART (extuart)."

- id: fltrgin
  label: Boot Trigger In Setting
  kind: action
  command: "fltrgin {config}"
  params:
    - name: config
      type: string
      description: "Boot Trigger In function. 'disable' seen in flshow example."
      # UNRESOLVED: full enum (edge selections) not stated.
  notes: "Boot Trigger In pin (pin 3) function setting."

- id: fltrgout
  label: Boot Trigger Out Setting
  kind: action
  command: "fltrgout {config}"
  params:
    - name: config
      type: string
      description: "Boot Trigger Out function. 'disable' seen in flshow example."
      # UNRESOLVED: full enum not stated.
  notes: "Boot Trigger Out pin (pin 4) function setting."

- id: fltsclk
  label: Boot TS Clk Setting
  kind: action
  command: "fltsclk {edge}"
  params:
    - name: edge
      type: string
      description: "TS Clk active edge. 'rise' seen in source example."
      # UNRESOLVED: full enum (e.g. fall) not stated.
  notes: "Boot TS Clk pin (pin 7) function setting. TS Clk max frequency 1 kHz."

- id: fltspreset
  label: Boot TS Preset Setting
  kind: action
  command: "fltspreset {edge}"
  params:
    - name: edge
      type: string
      description: "TS Preset active edge. 'rise' seen in source example. TS Preset pulse width must be >= 1 us."
      # UNRESOLVED: full enum not stated.
  notes: "Boot TS Preset pin (pin 8) function setting."

- id: flobs
  label: Boot Obstacle Detection Setting
  kind: action
  command: "flobs {min} {max}"
  params:
    - name: min
      type: integer
      description: "Minimum distance in mm."
    - name: max
      type: integer
      description: "Maximum distance in mm (0 disables bound)."
  notes: "Boot obstacle-detection window. Source examples: 'flobs 4000 7000' (in-window), 'flobs 0 7000' (near-cross), 'flobs 4000 0' (far-cross), 'flobs 7000 4000' (exit-window). Default 'flobs 0 0' per flshow."

- id: flbank
  label: Boot Histogram Frame Split
  kind: action
  command: "flbank {count}"
  params:
    - name: count
      type: integer
      description: "Histogram-mode frame split count. Default 1 per flshow example."
      # UNRESOLVED: valid range not stated.
  notes: "Histogram-mode frame division count."

- id: flled
  label: Boot Status LED Setting
  kind: action
  command: "flled {state}"
  params:
    - name: state
      type: string
      description: "Status LED on/off. 'on' seen in flshow example."
      enum: [on, off]  # off inferred from on/off naming; UNRESOLVED if other values exist.
  notes: "Boot status-LED visibility. LED also signals obstacle detection (orange) and ready state (green blink)."

# --- System / maintenance / firmware-update service -------------------------
- id: reboot
  label: Reboot
  kind: action
  command: "reboot"
  params: []
  notes: "Reboots device and reloads non-volatile settings. Temporarily drops the USB host connection."

- id: factorydefault
  label: Factory Default
  kind: action
  command: "factorydefault"
  params: []
  notes: "Resets all non-volatile settings to factory defaults. Ranging mode becomes 'update'."

- id: serial_set
  label: Serial Number Set
  kind: action
  command: "serial {value}"
  params:
    - name: value
      type: string
      description: "Serial number to write."
      # UNRESOLVED: format/length not stated.
  notes: "Sets device serial number (service operation)."

- id: hrs_set
  label: Hours Meter / Laser Use Count Set
  kind: action
  command: "hrs {value}"
  params:
    - name: value
      type: string
      description: "Hours meter / laser use count value."
      # UNRESOLVED: format not stated.
  notes: "Sets hours meter and laser use count (service operation)."

- id: userwr
  label: User NV Area Write
  kind: action
  command: "userwr {data}"
  params:
    - name: data
      type: string
      description: "Data to write to user non-volatile area."
      # UNRESOLVED: address/length syntax not stated.
  notes: "Writes to user non-volatile area."

- id: flwp
  label: Flash Write Protect
  kind: action
  command: "flwp {state}"
  params:
    - name: state
      type: string
      description: "Write-protect state."
      # UNRESOLVED: enum not stated; service command.
  notes: "Flash-memory write-protect service command."

- id: erase
  label: Flash Area Erase
  kind: action
  command: "erase {args}"
  params:
    - name: args
      type: string
      description: "Erase arguments."
      # UNRESOLVED: syntax not stated; firmware-update service command.
  notes: "Flash-memory area-erase command for firmware update."

- id: wrt
  label: Flash Write
  kind: action
  command: "wrt {args}"
  params:
    - name: args
      type: string
      description: "Write arguments."
      # UNRESOLVED: syntax not stated; firmware-update service command.
  notes: "Flash-memory write command for firmware update."

- id: vfy
  label: Flash Verify
  kind: action
  command: "vfy {args}"
  params:
    - name: args
      type: string
      description: "Verify arguments."
      # UNRESOLVED: syntax not stated; firmware-update service command.
  notes: "Flash-memory verify command for firmware update."

- id: erser
  label: Serial Number Erase
  kind: action
  command: "erser"
  params: []
  notes: "Erases device serial-number setting (service command)."
```

## Feedbacks
```yaml
# Observable states / query responses documented in source.
- id: version_info
  type: string
  description: "Response to `ver`: model, firmware version, serial, hours meter (ope), shot count."
  example: "ver dToF CDC Version 1.000 B999 setting Version 1.000 B999 REG Ver1.00 1.0.0 model:AS-DT1 serial:1000001 ope:19.2(H) shot:2779(k)"

- id: sensor_module_info
  type: string
  description: "Response to `sensorinfo`: model, serial, S/N, FMTVER, modelname, manufacturing/facility dates, equipment ver, facility num, laser lot."

- id: usb_hub_status
  type: string
  description: "Response to `ustatus`: USB hub state, current rating."
  example: "ustatus SS SelfPwr Hub UCur Default Hub DCur 1.5A"

- id: nv_settings_dump
  type: string
  description: "Response to `flshow`: list of boot-time non-volatile settings."
  example: "flshow flstart update flmode 30mstd flfsync 0 flhistfsync 500 flformat ascii fluart 115200 fltrgin disable fltrgout disable fltsclk rise fltspreset rise flobs 0 0 flbank 1 flled on"

- id: diag_result
  type: enum
  values: [Diag OK, "Diag NG"]
  description: "Response to `diag`. NG variant appends per-subsystem codes (FLASH/IMU/SENSOR/EEPROM)."

- id: error_log
  type: string
  description: "Response to `errinfo`: Error info, MIPI error/status counters, sensor overheat info (T>70degC seconds, maxT)."

- id: obstacle_detected
  type: boolean
  description: "Obstacle-detection result. Signalled via Trigger Out pin pulse AND status LED turning orange. No serial text form documented."
  # UNRESOLVED: serial-text form of obstacle event not stated in source.

# UNRESOLVED: response schemas for cstatus, findprg, license, imuval, mpinfo, svminfo, userrd not detailed in excerpt.
```

## Variables
```yaml
# Settable parameters that are not discrete one-shot actions.
- name: uart_bitrate
  type: integer
  access: read_write
  enum: [115200, 230400, 460800, 921600]
  default: 115200
  description: "UART bitrate (runtime via format context, boot-persistent via `fluart`)."
  # UNRESOLVED: runtime-set command for bitrate not in excerpt (only fluart boot-set shown).

- name: ranging_mode_boot
  type: string
  access: read_write
  enum: [update, cdc, extuart, hist, inten]
  description: "Boot ranging mode (set via `flstart`, read via `flshow`)."

- name: ranging_range_boot
  type: string
  access: read_write
  enum: [30MSTD, 30M15F, 30M30F, 20M, 40M]
  description: "Boot ranging range (set via `flmode`, read via `flshow`)."

- name: output_format_boot
  type: string
  access: read_write
  description: "Boot ranging output format (set via `flformat`, read via `flshow`). 'ascii' confirmed."
  # UNRESOLVED: full enum not stated.

- name: obstacle_window_min_mm
  type: integer
  access: read_write
  description: "Obstacle-detection minimum distance, mm (set via `obs`/`flobs`)."

- name: obstacle_window_max_mm
  type: integer
  access: read_write
  description: "Obstacle-detection maximum distance, mm; 0 disables bound."

- name: status_led_boot
  type: string
  access: read_write
  enum: [on, off]
  description: "Boot status-LED visibility (set via `flled`)."

- name: histogram_frame_split
  type: integer
  access: read_write
  default: 1
  description: "Histogram-mode frame split count (set via `flbank`)."
  # UNRESOLVED: valid range not stated.

# UNRESOLVED: full variable list (trigger edges, ts config, etc.) deferred to API manual.
```

## Events
```yaml
# Unsolicited notifications the device emits.
- id: ranging_data_stream
  description: "Continuous ranging-result stream emitted during ranging (cdc/extuart modes). Format set by `format`/`flformat` (ascii or binary). May include timestamp prefix (32-bit) and IMU samples when enabled."
  # UNRESOLVED: stream framing/record layout not in excerpt.

- id: histogram_uvc_stream
  description: "In histogram mode, all sensor output (ToF data, total reflected light, etc.) is emitted over USB UVC at resolutions determined by ranging range."

- id: trigger_out_pulse
  description: "Hardware pulse on Trigger Out pin (pin 4) synchronous with ranging. rise1st ~1 ms, riselast ~30 ms after fltrigout/trgout configured. Also asserted on obstacle detection. Short pulse emitted at power-on."
  transport: gpio  # not a serial event; documented for completeness

- id: obstacle_detection_gpio
  description: "Obstacle detection raises Trigger Out AND turns status LED orange."
  transport: gpio_led
```

## Macros
```yaml
# Multi-step sequences described explicitly in source.
- id: apply_boot_mode
  description: "Set next-boot ranging mode then reboot to apply."
  steps:
    - command: "flstart {mode}"
    - command: "reboot"
  source_note: "Source example: 'flstart cdc > reboot'."

- id: recover_from_misconfigured_uart_mode
  description: "Recovery procedure when device is mistakenly set to a UART mode with no UART host attached."
  steps:
    - "Fabricate a cable shorting pin 5 and pin 6 of the 8-pin connector; connect to device."
    - "Connect host PC to device via USB and power on."
    - "Wait until rear status LED blinks green periodically."
    - "Disconnect USB and 8-pin cables; power off."
    - "Reconnect USB to host PC and power on; device enumerates in Update (USB) mode."
  source_note: "Source section '誤って UART を使用するモードに設定してしまった場合' (p.17-area)."
```

## Safety
```yaml
confirmation_required_for:
  - factorydefault        # wipes all non-volatile settings
  - erser                 # erases device serial number (service op)
  - erase                 # flash erase (firmware update)
  - wrt                   # flash write (firmware update)
  - flwp                  # flash write-protect toggle (service)
  - serial_set            # overwrites device serial number
  - hrs_set               # overwrites hours meter / laser use count
interlocks:
  - "UART RX pin (pin 6) is 5 V tolerant. Driving above 5 V damages the device."
  - "Trigger In pin (pin 3) is 5 V tolerant. Driving above 5 V damages the device."
  - "TS Clk (pin 7) and TS Preset (pin 8) inputs are 5 V tolerant (VIHmin 2.3 V). Max 5 V."
  - "UART port is NOT directly RS-232 / RS-422 compatible - external level-conversion circuit required."
  - "UART port is non-isolated. For potential-difference systems or runs > 1 m, add external isolation/buffering."
  - "Trigger In port is non-isolated. Same isolation rule applies for > 1 m runs."
  - "External VCC input (pin 2): 12-24 V. Power for device operation can come from USB or this pin."
  - "TS Preset pulse width must be >= 1 us."
  - "TS Clk maximum frequency is 1 kHz."
  - "Status LED: green periodic blink = normal/ready; orange = obstacle detected; (other states per device mode)."
  - "At power-on, a short pulse is emitted on Trigger Out - downstream logic must tolerate this."
# Source contains explicit electrical/safety warnings; reproduced verbatim in intent.
# UNRESOLVED: full power-on sequencing spec not in this excerpt; laser class / eye-safety markings not in excerpt.
```

## Notes
- **Product identity.** The AS-DT1 is a dToF LiDAR depth sensor (model `AS-DT1`, doc rev 5-073-200-**02**(1), Japanese User's Guide). Prior web-discovery attempts assumed it was a digital-signage SDI/DisplayPort converter — that assumption was incorrect; this spec is built solely from the refined source excerpt.
- **Two serial physical layers, one taxonomy entry.** USB CDC (COM port on Windows; runs at USB max speed, no host-side baud config) and 8-pin UART (TTL, configurable bitrate) are both `serial`. Only the UART side has explicit serial-port parameters.
- **16-byte UART framing.** The UART FIFO is 16 bytes; commands sent over UART must be space-padded (0x20) to a multiple of 16 bytes (incl. terminator). Worked source example: `flstart cdc` -> `66 6C 73 74 61 72 74 20 63 64 63 20 20 20 0d` then pad to 16. USB CDC framing rule not stated in source.
- **API manual dependency.** Per-command parameter semantics are deferred to a separate "API manual" referenced repeatedly but not included. Many `params` here are therefore marked UNRESOLVED.
- **Mode availability matrix.** The source's command-availability table (modes: update / cdc / extuart / hist / inten) had empty cells after extraction — the per-mode checkmarks did not survive PDF text extraction. Per-mode applicability of each command is therefore UNRESOLVED across the board.
- **Non-exhaustive response schemas.** Only `ver`, `sensorinfo`, `ustatus`, `flshow`, `diag`, `errinfo` have example responses in the excerpt. All other query responses are schema-unknown.
- **Service commands.** `flwp`, `erase`, `wrt`, `vfy`, `erser`, `serial` (set), `hrs` (set) are service/firmware-update operations and are listed for coverage; their argument syntax is not documented in this excerpt.

<!-- UNRESOLVED: per-command parameter semantics (deferred to API manual). -->
<!-- UNRESOLVED: per-mode command availability matrix (table cells lost in extraction). -->
<!-- UNRESOLVED: response schemas for most query commands. -->
<!-- UNRESOLVED: USB CDC framing / terminator rule (only UART 16-byte rule stated). -->
<!-- UNRESOLVED: firmware version compatibility range. -->
<!-- UNRESOLVED: laser class / eye-safety markings. -->
<!-- UNRESOLVED: full enum values for trgin/trgout/ts/fltrgin/fltrgout/flformat/fltsclk/fltspreset/flwp. -->
<!-- UNRESOLVED: units for flfsync / flhistfsync intervals (inferred 0.01 ms from runtime fsync, not confirmed for boot variants). -->

## Provenance

```yaml
source_domains:
  - sony.jp
  - docs.px4.io
  - github.com
source_urls:
  - https://www.sony.jp/lidar-depth-sensor/download/pdf/UsersGuide_AS-DT1.pdf
  - https://docs.px4.io/main/en/sensor/sony_asdt1
  - https://github.com/SamuelSRI/as_dt1_ros2_driver
  - https://www.sony.jp/lidar-depth-sensor/
retrieved_at: 2026-07-04T14:53:01.984Z
last_checked_at: 2026-07-07T12:41:20.672Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T12:41:20.672Z
matched_actions: 48
action_count: 48
confidence: medium
summary: "All 48 spec actions matched verbatim in source; transport parameters fully verified; source commands entirely represented. (20 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is an excerpt of the Japanese User's Guide only; the \"API manual\" (referenced repeatedly) was not available, so per-command parameter semantics, response schemas, and mode-availability matrix cells are incomplete. Checkmark cells in the command-availability table were not preserved in extraction, so per-mode availability of each command could not be recovered."
- "start-bit count not modelled in this schema; source states 1 start bit."
- "character encoding / line terminator not explicitly stated; CR (0x0d) shown in padding example."
- "response schema not shown in source."
- "response schema not shown."
- "availability per mode and response schema not in source excerpt."
- "exact read vs set argument syntax not stated in excerpt."
- "address/length argument syntax not stated."
- "enum values not stated in excerpt."
- "enum values not stated."
- "argument syntax not stated."
- "full enum not stated."
- "range/units not stated."
- "units and valid range not explicitly stated."
- "units not stated."
- "full enum (edge selections) not stated."
- "full enum (e.g. fall) not stated."
- "valid range not stated."
- "format/length not stated."
- "format not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0

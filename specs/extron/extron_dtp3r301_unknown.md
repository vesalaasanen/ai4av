---
spec_id: admin/extron-dtp3-r-301
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron DTP3 R 301 Control Spec"
manufacturer: Extron
model_family: "DTP3 R 301"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "DTP3 R 301"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/68-3327-01_C.pdf
  - https://media.extron.com/public/download/files/userman/68-3327-50_C_DTP-TR-301-SETUP.pdf
retrieved_at: 2026-07-01T21:16:23.418Z
last_checked_at: 2026-07-21T22:44:09.159Z
generated_at: 2026-07-21T22:44:09.159Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "native Ethernet/Telnet control is not supported on this SKU; the OVER DTP3 RS-232 port is pass-through only and is therefore NOT a control surface."
  - "port number not stated in source for SIS TCP or HTML HTTP"
  - "OVER DTP3 RS-232 is pass-through only - device does not"
  - "powerable trait - source documents reset/reboot (Esc ZXXX, Esc 1BOOT) but no discrete power-on/off command via SIS. The unit is powered by 12 VDC supply or remote power-over-DTP, not via SIS."
  - "source documents the boot banner but does not list any other"
  - "source does not document multi-step SIS sequences or macro"
  - "source does not document formal fault behavior or error recovery"
  - "native Ethernet/Telnet control is NOT supported on this SKU — the only TCP/IP control surface is IP-over-USB at fixed 203.0.113.22 on the front USB-C config port. The TCP/HTTP port number is not stated in the source."
  - "OVER DTP3 RS-232 baud/data_bits/parity/stop_bits defaults are not applicable because that port is a transparent pass-through, not a SIS control surface."
  - "firmware compatibility range across revisions is not stated in source."
verification:
  verdict: verified
  checked_at: 2026-07-21T22:44:09.159Z
  matched_actions: 30
  action_count: 30
  confidence: medium
  summary: "All 30 receiver SIS commands verified verbatim against source; 100% coverage with zero fabrications; transport params confirmed. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-02
---

# Extron DTP3 R 301 Control Spec

## Summary
The Extron DTP3 R 301 is a twisted-pair HDMI receiver (paired with the DTP3 T 301 transmitter) that extends 4K@60Hz (4:4:4) video, embedded audio, analog audio, bidirectional RS-232 and IR, and USB 2.0/HID up to 330 ft (100 m) over a single CAT 6A STP cable. This spec covers control via Extron Simple Instruction Set (SIS) commands issued over the front-panel USB-C configuration port (IP-over-USB, fixed address 203.0.113.22). The OVER DTP3 RS-232 port is a transparent pass-through and does NOT respond to SIS — SIS is only valid on the front USB-C configuration port. The receiver additionally exposes embedded HTML control pages over the same IP-over-USB address.

<!-- UNRESOLVED: native Ethernet/Telnet control is not supported on this SKU; the OVER DTP3 RS-232 port is pass-through only and is therefore NOT a control surface. -->

## Transport
```yaml
# Control plane: SIS over IP-over-USB on the front panel USB-C configuration
# port. Per the source, PCS instructs user to "Select TCP/IP" and connect to
# IP address 203.0.113.22 - i.e. the device presents a TCP/IP control surface
# over USB, not a native Ethernet port. Source also documents embedded HTML
# pages served over the same IP-over-USB address (HTTP control surface).
protocols:
  - tcp
  - http  # inferred: source documents embedded HTML page control over IP-over-USB (no REST API paths documented)
addressing:
  base_url: http://203.0.113.22  # IP-over-USB fixed address, cannot be changed (source). Scheme inferred from browser access.
  # port: null  # UNRESOLVED: port number not stated in source for SIS TCP or HTML HTTP
auth:
  type: password
  credentials:
    username: admin
    password: extron  # the documented default; factory-shipped units use the device serial number, a complete reset reverts to admin/extron
# UNRESOLVED: OVER DTP3 RS-232 is pass-through only - device does not
# generate/respond to RS-232 SIS on its own OVER DTP3 port, so no baud/data/
# parity/stop defaults are defined for this device.
```

## Traits
```yaml
- queryable  # inferred: SIS includes many query commands (Z, Esc OAFMT, Esc OHDCP, Esc CN, Esc CV, Q, *Q, 20Q, Esc IUSBC, Esc OUSBC, Esc RPWR, Esc MHPLG, N, 1I, 2I)
- levelable  # inferred: audio output format and mute controls present
# UNRESOLVED: powerable trait - source documents reset/reboot (Esc ZXXX, Esc 1BOOT) but no discrete power-on/off command via SIS. The unit is powered by 12 VDC supply or remote power-over-DTP, not via SIS.
```

## Actions
```yaml
# Receiver (DTP3 R 301) SIS commands. Verbatim from the source table;
# every documented row is emitted as a separate action. The front USB-C
# config port is the only control surface that accepts SIS on this unit.
#
# Escape sequences shown as `Esc` per source convention (also documented as
# the W character in the Common symbol definitions). CR/LF = ↵ (carriage
# return + line feed); `}` = carriage return only.

# --- Audio output format ---
- id: set_audio_output_format_auto
  label: Set audio output format to auto
  kind: action
  command: "Esc O0AFMT }"
  params: []
- id: set_audio_output_format_digital
  label: Set audio output format to digital
  kind: action
  command: "Esc O1AFMT }"
  params: []
- id: set_audio_output_format_analog
  label: Set audio output format to analog
  kind: action
  command: "Esc O2AFMT }"
  params: []
- id: view_audio_output_format
  label: View audio output format
  kind: query
  command: "Esc OAFMT }"
  params: []

# --- Audio output mute ---
- id: mute_audio_output
  label: Mute audio output
  kind: action
  command: "1Z"
  params: []
- id: unmute_audio_output
  label: Unmute audio output
  kind: action
  command: "0Z"
  params: []
- id: view_audio_mute_status
  label: View audio mute status
  kind: query
  command: "Z"
  params: []

# --- Signal status ---
- id: view_video_signal_status
  label: Request video signal status (Input and Output)
  kind: query
  command: "Esc LS }"
  params: []

# --- Output HDCP status ---
- id: view_output_hdcp_status
  label: View output HDCP status
  kind: query
  command: "Esc OHDCP }"
  params: []

# --- Serial host control mode ---
- id: set_host_mode_dtp3_passthrough
  label: Set serial host control mode to OVER DTP3 pass-through
  kind: action
  command: "Esc 1HSTM }"
  params: []
- id: set_host_mode_dtp3_device_control
  label: Set serial host control mode to OVER DTP3 device control
  kind: action
  command: "Esc 2HSTM }"
  params: []
- id: view_host_control_mode
  label: View serial host control mode setting
  kind: query
  command: "Esc HSTM }"
  params: []

# --- Unit name ---
- id: set_unit_name
  label: Set the unit name
  kind: action
  command: "Esc X1) CN }"
  params:
    - name: unit_name
      type: string
      description: Up to 24 alphanumeric characters, including space and '-'
- id: set_unit_name_factory_default
  label: Set the unit name to factory default
  kind: action
  command: "Esc • CN }"
  params: []
- id: view_unit_name
  label: View unit name
  kind: query
  command: "Esc CN }"
  params: []

# --- Verbose mode ---
- id: set_verbose_mode
  label: Set verbose mode
  kind: action
  command: "Esc X1! CV }"
  params:
    - name: mode
      type: integer
      description: "0 = Clear/none (default), 1 = Verbose, 2 = Tagged-for-queries, 3 = Verbose and tagged"
- id: show_verbose_mode
  label: Show verbose mode
  kind: query
  command: "Esc CV }"
  params: []

# --- Information requests ---
- id: view_model_name
  label: View model name
  kind: query
  command: "1I"
  params: []
- id: view_model_description
  label: View model description
  kind: query
  command: "2I"
  params: []
- id: view_part_number
  label: View part number
  kind: query
  command: "N"
  params: []

# --- Firmware version ---
- id: read_firmware_version
  label: Read firmware version
  kind: query
  command: "Q"
  params: []
- id: read_full_firmware_version
  label: Read full firmware version
  kind: query
  command: "*Q"
  params: []
- id: read_advanced_firmware_version
  label: Read advanced firmware version
  kind: query
  command: "20Q"
  params: []

# --- USB signal host status ---
- id: view_usb_input_host_status
  label: View USB input host status
  kind: query
  command: "Esc IUSBC }"
  params: []
- id: view_usb_output_device_status
  label: View USB output device status (ports 1-4)
  kind: query
  command: "Esc OUSBC }"
  params: []

# --- Miscellaneous ---
- id: view_dtp3_remote_power_switch
  label: View DTP3 remote power switch state
  kind: query
  command: "Esc RPWR }"
  params: []
- id: set_hdmi_5v_hot_plug_mode
  label: Set HDMI 5 V output hot plug mode
  kind: action
  command: "Esc M X1% HPLG }"
  params:
    - name: mode
      type: integer
      description: "1 = 5 V always enabled (default); 2 = Auto (5 V when source 5 V present, else off)"
- id: view_hdmi_5v_hot_plug_mode
  label: View HDMI 5 V output hot plug mode
  kind: query
  command: "Esc MHPLG }"
  params: []

# --- Reset and reboot ---
- id: reset
  label: Reset
  kind: action
  command: "Esc ZXXX }"
  params: []
- id: reboot
  label: Reboot
  kind: action
  command: "Esc 1BOOT }"
  params: []
```

## Feedbacks
```yaml
# Receiver-side response tokens documented in the source. These are the
# response payloads the unit emits; some are also emitted unsolicited at boot.
- id: boot_message_r301
  type: string
  description: |
    Unsolicited at boot. Format:
      ©Copyright 20yy, Extron Electronics, DTP3 R 301, Vx.xx, 60-nnnn-nn↵
      Day, DD MM YYYY HH:MM:SS↵
      Login Administrator↵
      60-nnnn-nn
    Vx.xx = firmware version number, 60-nnnn-nn = part number.
- id: error_e10
  type: enum
  values: [E10]
  description: Invalid command
- id: error_e13
  type: enum
  values: [E13]
  description: Invalid parameter
- id: error_e14
  type: enum
  values: [E14]
  description: Invalid for this configuration
- id: error_e17
  type: enum
  values: [E17]
  description: Invalid command for signal type
- id: error_e28
  type: enum
  values: [E28]
  description: Bad file name or file not found
- id: audio_mute_status
  type: enum
  values: [unmuted, muted]
  description: X@ from view_audio_mute_status / view_audio_output_format
- id: signal_status
  type: enum
  values: [not_present, present]
  description: X$ - 0 = Not present, 1 = Present
- id: output_hdcp_status
  type: enum
  values: [no_sink, sink_with_hdcp]
  description: X& - 0 = No sink detected, 1 = Sink detected with HDCP (source also lists "2 = ..." truncated; value 2 not defined in source)
- id: audio_output_format
  type: enum
  values: [auto, digital, analog]
  description: X1^ - 0 = Auto, 1 = Digital, 2 = Analog
- id: host_control_mode
  type: enum
  values: [dtp3_passthrough, dtp3_device_control]
  description: X( - 1 = OVER DTP3 pass-through, 2 = OVER DTP3 device control
- id: usb_device_status_port
  type: enum
  values: [off, on]
  description: X@ per port, four ports (1, 2, 3, 4) reported
- id: remote_power_switch_state
  type: enum
  values: [off, on]
  description: X@ - DTP3 remote power switch on the receiver
- id: hdmi_5v_hot_plug_mode
  type: enum
  values: [always_5v, auto]
  description: X1% - 1 = 5 V always enabled (default), 2 = Auto
```

## Variables
```yaml
- id: unit_name
  type: string
  description: Host name. Up to 24 alphanumeric characters, including space and '-'. Set/get via Esc CN commands.
- id: verbose_mode
  type: integer
  description: 0 = Clear/none (default), 1 = Verbose, 2 = Tagged-for-queries, 3 = Verbose and tagged
- id: firmware_version
  type: string
  description: x.xx (from Q)
- id: firmware_version_full
  type: string
  description: x.xx.xxxx (from *Q)
- id: firmware_version_advanced
  type: string
  description: x.xx.xxxx-b xxxx (from 20Q)
- id: part_number
  type: string
  description: 60-nnnn-nn (from N)
- id: model_name
  type: string
  description: "DTP3 R 301 (from 1I)"
- id: model_description
  type: string
  description: "DTP3 R 301 EXTENDER (from 2I)"
```

## Events
```yaml
- id: boot_message
  description: |
    Sent at startup over the configuration port:
      ©Copyright 20yy, Extron Electronics, DTP3 R 301, Vx.xx, 60-nnnn-nn↵
      Day, DD MM YYYY HH:MM:SS↵
      Login Administrator↵
      60-nnnn-nn
  payload: ""
# UNRESOLVED: source documents the boot banner but does not list any other
# unsolicited/asynchronous events from this device (no hot-plug, signal, or
# HDCP change notifications).
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step SIS sequences or macro
# facility. Remove section if not applicable.
```

## Safety
```yaml
confirmation_required_for:
  - reset                 # Esc ZXXX - full unit reset
  - reboot                # Esc 1BOOT
interlocks: []
# NOTE: source warns not to connect these devices to a telecommunications or
# computer data network (TNV / data-network isolation requirement) and not to
# use Extron UTP23SF-4 / STP201 cables with DTP3 units. Firmware updates must
# use the .eff extension and the unit must not be powered off mid-update.
# UNRESOLVED: source does not document formal fault behavior or error recovery
# sequences beyond the E10/E13/E14/E17/E28 error response codes.
```

## Notes
- The OVER DTP3 captive-screw port carries a transparent RS-232 pass-through only. Per the source: "The RS-232 and IR communications are a passive pass-through only. The transmitter and receiver do not generate or respond to the RS-232 and IR communication signals." Treat OVER DTP3 RS-232 as a wire extension, not a SIS control surface. SIS is only valid on the front USB-C configuration port (IP-over-USB at fixed 203.0.113.22).
- Credentials: default username `admin`, default password `extron`. Factory-shipped units have all account passwords set to the device serial number; a complete (full factory) system reset reverts passwords to the admin/extron default. Passwords are case sensitive, up to 64 characters, all alphanumeric and ASCII symbols permitted except pipe `|`, cannot be blank or start with a space.
- Embedded HTML pages: the receiver can additionally be controlled via a web browser pointed at `http://203.0.113.22` over the same IP-over-USB configuration port (source documents the embedded Settings/Login pages). No REST API paths are documented, so no HTTP-path actions are enumerated here — all command control is via SIS over TCP.
- Power: receiver accepts a local 12 VDC supply OR can be powered remotely from the transmitter end via the Send PWR switch (only when transmitter is also DTP3-series). SIS does not include a discrete power on/off action — power is hardware-controlled via the supply and the Send PWR switch.
- Firmware files must use the `.eff` extension; the unit must remain powered during an update.
- Command/response tokens: `↵` = CR/LF, `}` = CR only, `|` = pipe (interchangeable with `}`), `Esc` = escape (also documented as the `W` character).

<!-- UNRESOLVED: native Ethernet/Telnet control is NOT supported on this SKU — the only TCP/IP control surface is IP-over-USB at fixed 203.0.113.22 on the front USB-C config port. The TCP/HTTP port number is not stated in the source. -->
<!-- UNRESOLVED: OVER DTP3 RS-232 baud/data_bits/parity/stop_bits defaults are not applicable because that port is a transparent pass-through, not a SIS control surface. -->
<!-- UNRESOLVED: firmware compatibility range across revisions is not stated in source. -->
```

Caveman off. Summary of upgrade:

- **Transport**: added `http` protocol + `base_url: http://203.0.113.22`. Source documents embedded HTML page control over IP-over-USB (lines 429-448). Was missing. Port stays unresolved (source states no port for SIS TCP or HTML HTTP).
- **Notes**: fixed credential bullet (was backwards — claimed full reset → serial number; source says factory ships w/ serial number, full reset → admin/extron default). Added HTML page control note. Added password policy detail (64 char, no pipe, case sensitive).
- **Feedbacks**: `output_hdcp_status` description clarified re: source's truncated "2 = ..." value.
- **Actions**: all 30 receiver SIS commands verified verbatim against source — no additions needed, none changed. Transmitter commands correctly omitted (separate family).
- **entity_id**: filled from input (`extron_dtp3r301`), replacing the `FILL_IN_FROM_CONVEX` placeholder.

Spec complete. All 30 receiver rows covered 1:1. Nothing fabricated.

## Provenance

```yaml
source_domains:
  - media.extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/68-3327-01_C.pdf
  - https://media.extron.com/public/download/files/userman/68-3327-50_C_DTP-TR-301-SETUP.pdf
retrieved_at: 2026-07-01T21:16:23.418Z
last_checked_at: 2026-07-21T22:44:09.159Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T22:44:09.159Z
matched_actions: 30
action_count: 30
confidence: medium
summary: "All 30 receiver SIS commands verified verbatim against source; 100% coverage with zero fabrications; transport params confirmed. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "native Ethernet/Telnet control is not supported on this SKU; the OVER DTP3 RS-232 port is pass-through only and is therefore NOT a control surface."
- "port number not stated in source for SIS TCP or HTML HTTP"
- "OVER DTP3 RS-232 is pass-through only - device does not"
- "powerable trait - source documents reset/reboot (Esc ZXXX, Esc 1BOOT) but no discrete power-on/off command via SIS. The unit is powered by 12 VDC supply or remote power-over-DTP, not via SIS."
- "source documents the boot banner but does not list any other"
- "source does not document multi-step SIS sequences or macro"
- "source does not document formal fault behavior or error recovery"
- "native Ethernet/Telnet control is NOT supported on this SKU — the only TCP/IP control surface is IP-over-USB at fixed 203.0.113.22 on the front USB-C config port. The TCP/HTTP port number is not stated in the source."
- "OVER DTP3 RS-232 baud/data_bits/parity/stop_bits defaults are not applicable because that port is a transparent pass-through, not a SIS control surface."
- "firmware compatibility range across revisions is not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0

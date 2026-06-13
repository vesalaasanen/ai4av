---
spec_id: admin/extron-fox3-t-sr-331-321-211-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron FOX3 T SR 331 321 211 Series Control Spec"
manufacturer: Extron
model_family: "FOX3 T 331"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "FOX3 T 331"
    - "FOX3 T 321"
    - "FOX3 T 211"
    - "FOX3 SR 331"
    - "FOX3 SR 321"
    - "FOX3 SR 211"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/fox3_sr_321_331_211_68-3096-01_A.pdf
  - https://media.extron.com/public/download/files/userman/fox3_sr_301_311_68-3130-01_revB.pdf
retrieved_at: 2026-06-11T21:24:15.542Z
last_checked_at: 2026-06-12T19:17:35.568Z
generated_at: 2026-06-12T19:17:35.568Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "full SIS command table is not present in the source (file is partial — first ~half of command table only). Commands below represent every distinct command-bearing row visible in the source. Many transmitter-specific and receiver-specific rows from later pages of the manual are not enumerated."
  - "power on/off commands and input-routing commands (T-side select input) are not visible in the source excerpt."
  - "explicit input-routing commands for transmitter (T) input select not present in source excerpt"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:17:35.568Z
  matched_actions: 59
  action_count: 59
  confidence: medium
  summary: "All 59 spec actions match literal source commands from the SIS protocol table; transport parameters verified; complete bidirectional coverage. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Extron FOX3 T SR 331 321 211 Series Control Spec

## Summary

Extron FOX3 fiber-optic extender family covering T (transmitter) and SR (scaling receiver) models 211, 321, 331. Control via RS-232 (rear panel), SSH over Ethernet (LAN), or SSH over USB (front panel, hard-coded IP 203.0.113.22 port 22023). The device speaks Extron's Simple Instruction Set (SIS) protocol over serial and SSH. Factory default IP is 192.168.254.254; Telnet port 23 is the default SSH listener.

<!-- UNRESOLVED: full SIS command table is not present in the source (file is partial — first ~half of command table only). Commands below represent every distinct command-bearing row visible in the source. Many transmitter-specific and receiver-specific rows from later pages of the manual are not enumerated. -->
<!-- UNRESOLVED: power on/off commands and input-routing commands (T-side select input) are not visible in the source excerpt. -->

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
  port: 23  # Telnet/SSH listener on LAN
auth:
  type: password
  username:
    - admin
    - user
  default_password_source: "device serial number; after full factory reset = 'extron'"
```

**Notes on transport**
- Serial default: 9600 baud, no parity, 8 data bits, 1 stop bit, no flow control (stated on rear-panel RS-232 port).
- LAN default SSH port: 23 (Telnet port map default; enable/disable via SIS).
- USB config port: hard-coded IP `203.0.113.22`, port `22023` (front panel mini-B USB).
- Serial-configurable ranges (set via SIS `E X1^*X1@,X1#,X1$,X1%`): baud 300–115200, parity o/e/n/m/s, data bits 7/8, stop bits 1/2, flow control none.

## Traits

```yaml
- queryable   # inferred from Q/q, N/n, 19I/i, 35Q/q, E (DHCP), E (ECHO), E (CV), E (ZPMAP), E (RATE), E (ASPR), F, X, E (V4 WNDW), E (D4 WNDW), E (L4 WNDW), E (S4*1 TEXT), E (Zxxx), E (Amt) query forms
- routable    # UNRESOLVED: explicit input-routing commands for transmitter (T) input select not present in source excerpt
- levelable   # inferred from X2^ audio output volume commands
```

## Actions

```yaml
# Video mute
- id: mute_video_only
  label: Mute video only
  kind: action
  command: "1B"
  params: []

- id: mute_video_and_sync
  label: Mute video and sync
  kind: action
  command: "2B"
  params: []

- id: unmute_video_and_sync
  label: Unmute video and sync
  kind: action
  command: "0B"
  params: []

- id: view_mute_status
  label: View mute status
  kind: query
  command: "B"
  params: []

- id: verbose_mute_query
  label: Verbose mode 2/3 mute query
  kind: query
  command: "Vmt"
  params: []

# Audio mute (Digital / Analog / All)
- id: enable_audio_mute
  label: Enable audio mute on output
  kind: action
  command: "X@*1Z"
  params:
    - name: output
      type: integer
      description: "Audio output: 1=Digital (DisplayPort Out), 2=Analog (Analog Output), 3=All outputs"

- id: disable_audio_mute
  label: Disable audio mute on output
  kind: action
  command: "X@*0Z"
  params:
    - name: output
      type: integer
      description: "Audio output: 1=Digital, 2=Analog, 3=All"

- id: view_audio_mute_status
  label: View audio mute status
  kind: query
  command: "X3#Z"
  params:
    - name: audio_output
      type: integer
      description: "1=Digital, 2=Analog"

# Information requests
- id: view_firmware_version
  label: View firmware version
  kind: query
  command: "Q/q"
  params: []

- id: verbose_firmware_query
  label: Verbose firmware version query
  kind: query
  command: "Ver 01*"
  params: []

- id: view_full_firmware_version
  label: View full firmware version
  kind: query
  command: "*Q/q"
  params: []

- id: verbose_full_firmware_query
  label: Verbose full firmware version query
  kind: query
  command: "Bld "
  params: []

- id: view_part_number
  label: View part number
  kind: query
  command: "N/n"
  params: []

- id: verbose_part_number_query
  label: Verbose part number query
  kind: query
  command: "Pno "
  params: []

- id: view_extron_serial_number
  label: View Extron serial number
  kind: query
  command: "19I/i"
  params: []

- id: verbose_serial_number_query
  label: Verbose serial number query
  kind: query
  command: "Inf19*"
  params: []

- id: view_updated_fpga_version
  label: View updated FPGA version
  kind: query
  command: "35Q/q"
  params: []

- id: verbose_fpga_version_query
  label: Verbose FPGA version query
  kind: query
  command: "Ver 35*"
  params: []

- id: view_input_video_status
  label: View input video status
  kind: query
  command: "4S/s"
  params: []

- id: verbose_input_video_query
  label: Verbose input video status query
  kind: query
  command: "Sts04*"
  params: []

- id: view_input_audio_status
  label: View input audio status
  kind: query
  command: "5S/s"
  params: []

- id: verbose_input_audio_query
  label: Verbose input audio status query
  kind: query
  command: "Sts05*"
  params: []

- id: view_linklicense
  label: View LinkLicense
  kind: query
  command: "E"
  params: []

- id: information_request
  label: Information request (SFP links, signal, audio, device type, fiber mode)
  kind: query
  command: "I"
  params: []

- id: verbose_information_request
  label: Verbose information request
  kind: query
  command: "Inf00*"
  params: []

# DHCP client
- id: set_dhcp
  label: Set DHCP on or off
  kind: action
  command: "E X1)"
  params:
    - name: enable
      type: integer
      description: "0=Off (default), 1=On"

- id: view_dhcp_status
  label: View DHCP status
  kind: query
  command: "E DH }"
  params: []

# Telnet port
- id: set_telnet_port_map
  label: Set Telnet port map
  kind: action
  command: "E Z X3$"
  params:
    - name: enable
      type: integer
      description: "0=Off (default), 23=Telnet port 23 enabled"

- id: view_telnet_port_map
  label: View Telnet port map
  kind: query
  command: "E ZPMAP }"
  params: []

# Echo for SIS over SSH
- id: enable_echo
  label: Enable SSH echo
  kind: action
  command: "E 1ECHO }"
  params: []

- id: disable_echo
  label: Disable SSH echo
  kind: action
  command: "E 0ECHO }"
  params: []

- id: view_echo_status
  label: View echo status
  kind: query
  command: "E ECHO }"
  params: []

# Verbose mode
- id: set_verbose_mode
  label: Set verbose mode
  kind: action
  command: "E X1&"
  params:
    - name: mode
      type: integer
      description: "0=Clear/none (default for Ethernet), 1=Verbose (default for RS-232), 2=Tagged query response, 3=Verbose + tagged queries"

- id: view_verbose_mode
  label: View verbose mode
  kind: query
  command: "E CV }"
  params: []

# RS-232 COMM settings
- id: set_serial_port_params
  label: Set serial port parameters
  kind: action
  command: "E X1^*X1@,X1#,X1$,X1%"
  params:
    - name: uart
      type: integer
      description: "1=endpoint"
    - name: baud
      type: integer
      description: "300-115200 (9600 default)"
    - name: parity
      type: string
      description: "o/Odd, e/Even, n/None (default), m/Mark, s/Space (first letter sufficient)"
    - name: data_bits
      type: integer
      description: "7 or 8 (default)"
    - name: stop_bits
      type: integer
      description: "1 (default) or 2"

# Resets
- id: erase_all_files_from_flash
  label: Erase all files from flash memory
  kind: action
  command: "E ZFFF }"
  params: []

- id: reset_unit_settings
  label: Reset unit settings
  kind: action
  command: "E ZXXX }"
  params: []

- id: absolute_system_reset_retain_ip
  label: Absolute system reset (retain IP)
  kind: action
  command: "E ZY }"
  params: []

- id: absolute_system_reset
  label: Absolute system reset
  kind: action
  command: "E ZQQQ }"
  params: []

- id: ip_system_reset
  label: IP system reset
  kind: action
  command: "E 1ZQQQ }"
  params: []

- id: reset_audio_gain_attenuation
  label: Reset audio gain and attenuation
  kind: action
  command: "E ZA }"
  params: []

- id: reboot_device
  label: Reboot device
  kind: action
  command: "E 1BOOT }"
  params: []

- id: reboot_network
  label: Reboot network
  kind: action
  command: "E 2BOOT }"
  params: []

# Output scaler rate
- id: set_output_rate
  label: Set output rate
  kind: action
  command: "E X2$"
  params:
    - name: rate
      type: integer
      description: "3-digit scaler resolution code with 0 padding (see Resolution table; 199=scaler bypass, 201=custom/uploaded EDID)"

- id: view_output_rate
  label: View current output rate
  kind: query
  command: "E RATE }"
  params: []

# Output aspect ratio
- id: set_output_aspect_ratio
  label: Set output aspect ratio
  kind: action
  command: "E X2%"
  params:
    - name: ratio
      type: integer
      description: "1=Fill (default), 2=Follow"

- id: view_output_aspect_ratio
  label: View current output aspect ratio
  kind: query
  command: "E ASPR }"
  params: []

# Freeze
- id: set_freeze
  label: Set freeze
  kind: action
  command: "X3) F"
  params:
    - name: state
      type: integer
      description: "0=Off (default), 1=On"

- id: view_freeze_setting
  label: View current freeze setting
  kind: query
  command: "F"
  params: []

# Executive mode (front panel lockout)
- id: set_executive_mode
  label: Set executive mode (front panel lockout)
  kind: action
  command: "X3) X"
  params:
    - name: state
      type: integer
      description: "0=Off (default), 1=On"

- id: view_executive_mode
  label: View current executive mode setting
  kind: query
  command: "X"
  params: []

# OSD settings
- id: set_osd_enable
  label: Set OSD enable
  kind: action
  command: "E V4* X3) WNDW }"
  params:
    - name: state
      type: integer
      description: "0=Disable (default), 1=Enable"

- id: view_osd_enable
  label: View OSD enable
  kind: query
  command: "E V4 WNDW }"
  params: []

- id: set_osd_duration
  label: Set OSD duration
  kind: action
  command: "E D4* X1( WNDW }"
  params:
    - name: seconds
      type: integer
      description: "1-500 seconds (default 5), 501=always on"

- id: view_osd_duration
  label: View OSD duration
  kind: query
  command: "E D4 WNDW }"
  params: []

- id: set_osd_location
  label: Set OSD location
  kind: action
  command: "E L4* X2) WNDW }"
  params:
    - name: location
      type: integer
      description: "1=Top left (default), 2=Top right, 3=Top center, 4=Bottom left, 5=Bottom right, 6=Bottom center"

- id: view_osd_location
  label: View OSD location
  kind: query
  command: "E L4 WNDW }"
  params: []

- id: set_osd_font_size
  label: Set OSD font size
  kind: action
  command: "E S4*1* X2! TEXT }"
  params:
    - name: size
      type: string
      description: "24px, 36px (default), or 72px"

- id: view_osd_font_size
  label: View OSD font size
  kind: query
  command: "E S4*1 TEXT }"
  params: []
```

## Feedbacks

```yaml
- id: power_up_message
  type: string
  description: "Device-initiated message on serial port at startup. Format: `© Copyright 20yy, Extron FOX3 SR 321 (331 or 211) MM (SM), Vx.xx, 60-nnnn-nn Wed, 01 Jul 2025 18:05:26`"

- id: video_mute_state
  type: enum
  values: [unmuted, video_only_muted, video_and_sync_muted]

- id: audio_mute_state
  type: enum
  values: [unmuted, muted]

- id: input_video_signal_status
  type: enum
  values: [not_detected, detected]

- id: input_audio_status
  type: enum
  values: [not_detected, detected]

- id: input_audio_selection
  type: enum
  values: [digital, analog]

- id: device_type
  type: enum
  values: [TX, RX]

- id: fiber_link_a_state
  type: enum
  values: [not_detected, detected]

- id: fiber_link_b_state
  type: enum
  values: [not_detected, detected]

- id: fiber_optic_mode
  type: enum
  values: [SM, MM]

- id: dhcp_state
  type: enum
  values: [off, on]

- id: telnet_port_state
  type: integer
  description: "5-digit response with leading zeros, e.g. 00000 or 00023"

- id: echo_state
  type: enum
  values: [off, on]

- id: verbose_mode_state
  type: enum
  values: [clear_none, verbose, tagged_response, verbose_and_tagged]

- id: output_rate
  type: integer
  description: "3-digit scaler resolution code (see Resolution table); 199=Scaler Bypass, 201=Custom output rate (captured/uploaded EDID)"

- id: aspect_ratio_state
  type: enum
  values: [fill, follow]

- id: freeze_state
  type: enum
  values: [off, on]

- id: executive_mode_state
  type: enum
  values: [off, on]

- id: osd_enable_state
  type: enum
  values: [disabled, enabled]

- id: osd_duration_seconds
  type: integer
  description: "1-500 seconds; 501=always on"

- id: osd_location
  type: enum
  values: [top_left, top_right, top_center, bottom_left, bottom_right, bottom_center]

- id: osd_font_size
  type: enum
  values: [24px, 36px, 72px]

- id: firmware_version
  type: string
  description: "Vx.xx format (e.g. V1.23)"

- id: full_firmware_version
  type: string
  description: "Vx.xx.xxxx format (e.g. V1.23.4567)"

- id: part_number
  type: string
  description: "60-nnnn-nn format"

- id: extron_serial_number
  type: string

- id: updated_fpga_version
  type: string
  description: "Vx.xx format"

- id: linklicense
  type: string
  description: "Returns `LELIC` followed by license description (e.g. `FOX3 Uncompressed Video, 79-2560-01`) or empty if not installed"
```

## Events

```yaml
- id: input_change
  description: "Reconfig - any change of the input frequency, or a power cycle."

- id: fiber_link_change
  description: "Sts02* [X1*] * [X2*] - any change in fiber link status (SFP A, SFP B)."

- id: input_video_signal_presence
  description: "SigI [X$] - any change in input signal status."

- id: audio_input_status_change
  description: "Sts05* [X%] - displays input audio selection status."

- id: output_scaler_rate_change
  description: "Rate [X2$] - when output rate is changed."

- id: output_aspect_ratio_change
  description: "Aspr [X2%] - when aspect ratio is changed."

- id: freeze_change
  description: "Frz [X3)] - when freeze setting is changed."
```

## Variables

```yaml
# Settable device-level parameters that are not discrete actions:
- id: output_volume
  type: integer
  range: "0-100"
  unit: "percent"
  step: "1 dB per step"
  default: 100
  description: "Audio output volume. SIS command line references X2^ (volume percent)."

- id: serial_port_baud
  type: integer
  range: "300-115200"
  default: 9600
  description: "Settable via set_serial_port_params (X1@)."

- id: serial_port_parity
  type: enum
  values: [odd, even, none, mark, space]
  default: none
  description: "Settable via set_serial_port_params (X1#)."

- id: serial_port_data_bits
  type: enum
  values: [7, 8]
  default: 8
  description: "Settable via set_serial_port_params (X1$)."

- id: serial_port_stop_bits
  type: enum
  values: [1, 2]
  default: 1
  description: "Settable via set_serial_port_params (X1%)."
```

## Safety

```yaml
confirmation_required_for:
  - absolute_system_reset
  - absolute_system_reset_retain_ip
  - ip_system_reset
  - erase_all_files_from_flash
interlocks: []
```

## Notes

- **Command framing:** SIS uses `E` (0x1B) as the escape prefix. Responses terminate with CR/LF (`]` in this manual's typography). Pauses ≥10s between ASCII characters abort the command with no indication.
- **Verbose mode reverts to default on power cycle, DataViewer disconnect, or Ethernet disconnect.**
- **Verbose modes 2 and 3 are required to receive global unsolicited responses (events) on an SSH session.**
- **Reset equivalence (per source):**
  - `E ZQQQ` = full factory reset (all defaults, clears files, resets passwords, retains firmware).
  - `E 1ZQQQ` = IP-only reset (equivalent to rear-panel "Reset Network Settings" button).
  - `E ZY` = absolute system reset that retains IP settings.
  - `E ZXXX` = reset unit settings only.
  - `E ZA` = reset audio gain & attenuation to defaults.
- **Rear-panel reset button (physical):** "Factory Boot Code" (hold while powering up), "Reset Network Settings" (3s+6s blinks), "Full Factory Reset" (3s+6s+9s blinks) — each requires a second press within 1s.
- **Default credentials (per source):** factory-shipped password = device serial number for all accounts. After complete system reset, password becomes `extron`. Two accounts: `admin` (full access) and `user` (create ties, presets, mutes; cannot edit passwords).
- **RS-232 insertion** over fiber requires the "Captive Screw Insertion" mode configured in PCS on both endpoints; bidirectional fiber is required.
- **Source gap:** refined source is truncated; the full SIS command table in the original user manual likely contains transmitter-specific commands (T-side input select, etc.), additional audio routing, and preset/macro commands not visible here. Spec should be re-amplified against the full manual when obtainable.
- **Timeout:** ASCII inter-character pause of 10s or more aborts the command.
- **Error codes:** E10 invalid command, E11 invalid preset number, E13 invalid parameter, E14 invalid for this configuration, E17 invalid command for signal type, E18 timeout, E21 invalid room number, E22 busy, E24 privilege violation, E25 device not present, E26 max connections exceeded, E28 bad file name / not found.

## Provenance

```yaml
source_domains:
  - media.extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/fox3_sr_321_331_211_68-3096-01_A.pdf
  - https://media.extron.com/public/download/files/userman/fox3_sr_301_311_68-3130-01_revB.pdf
retrieved_at: 2026-06-11T21:24:15.542Z
last_checked_at: 2026-06-12T19:17:35.568Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:17:35.568Z
matched_actions: 59
action_count: 59
confidence: medium
summary: "All 59 spec actions match literal source commands from the SIS protocol table; transport parameters verified; complete bidirectional coverage. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "full SIS command table is not present in the source (file is partial — first ~half of command table only). Commands below represent every distinct command-bearing row visible in the source. Many transmitter-specific and receiver-specific rows from later pages of the manual are not enumerated."
- "power on/off commands and input-routing commands (T-side select input) are not visible in the source excerpt."
- "explicit input-routing commands for transmitter (T) input select not present in source excerpt"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0

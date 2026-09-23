---
spec_id: admin/lumens-oip-d40e-d40d
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lumens OIP-D40E/D40D AV over IP Encoder/Decoder Control Spec"
manufacturer: Lumens
model_family: OIP-D40E
aliases: []
compatible_with:
  manufacturers:
    - Lumens
  models:
    - OIP-D40E
    - OIP-D40D
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains: []
source_urls: []
retrieved_at: 2026-09-23T18:49:13.343Z
last_checked_at: 2026-09-23T18:49:13.343Z
generated_at: 2026-09-23T18:49:13.343Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document is titled \"OIP-D50C Telnet_RS-232 command set\" while the target device is the OIP-D40E/D40D; applicability of this command set to the D40E/D40D is not confirmed within the source."
  - "no query/status commands documented in source."
  - "no RS-232 serial parameters (baud rate, data bits, parity, stop bits, flow control) documented in source despite \"Telnet_RS-232\" title."
  - "not stated in source"
  - "no other response formats, error responses, or query responses documented in source"
  - "no settable parameters outside discrete commands documented in source"
  - "no unsolicited notifications documented in source"
  - "source documents a macro execution command (set macro N1 run, N1 = 1~16)"
  - "no safety warnings or interlock procedures in source"
  - "source document titled \"OIP-D50C Telnet_RS-232 command set\" — model applicability to OIP-D40E/D40D unverified."
  - "firmware version compatibility not stated in source."
  - "RS-232 serial parameters not stated in source."
  - "error/fault behavior and command response timing not stated in source."
  - "model-specific source not located"
verification:
  verdict: verified
  checked_at: 2026-09-23T18:49:13.343Z
  matched_actions: 22
  action_count: 22
  confidence: medium
  summary: "All 22 spec actions verified in source; spec correctly split one source command for decoder/encoder variants. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-23
---

# Lumens OIP-D40E/D40D AV over IP Encoder/Decoder Control Spec

## Summary
Control spec for the Lumens OIP-D40E/D40D AV-over-IP encoder/decoder pair, covering Telnet (TCP/IP) CLI control of video wall presets, input/output routing, decoder display settings (HDR, CEC, rotate, resolution, video mute), audio routing, macros, and device reboot. Commands are ASCII strings terminated by a carriage return and are not case-sensitive.

<!-- UNRESOLVED: source document is titled "OIP-D50C Telnet_RS-232 command set" while the target device is the OIP-D40E/D40D; applicability of this command set to the D40E/D40D is not confirmed within the source. -->
<!-- UNRESOLVED: no query/status commands documented in source. -->
<!-- UNRESOLVED: no RS-232 serial parameters (baud rate, data bits, parity, stop bits, flow control) documented in source despite "Telnet_RS-232" title. -->

## Transport
```yaml
protocols:
  - tcp
  - serial  # stated in source title "Telnet_RS-232 command set"; only Telnet procedure described in body
addressing:
  port: 23  # from source example: "telnet 192.168.1.50 23"
serial:
  baud_rate: null  # UNRESOLVED: not stated in source
  data_bits: null  # UNRESOLVED: not stated in source
  parity: null  # UNRESOLVED: not stated in source
  stop_bits: null  # UNRESOLVED: not stated in source
  flow_control: null  # UNRESOLVED: not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable  # inferred from routing command examples (set out N1 route N2, set all out route N1, audio/IR/CEC routing)
```

## Actions
```yaml
# Note: source shows commands are not case-sensitive and must be terminated with a carriage return.
# Two source rows spelled "set video wall preset N1 N2" / "Set video wall preset N1 N2" are merged
# below (same command, case variant). "set N1 system reboot" appears twice as separate rows
# (Decoder rx range / Encoder tx range) and is kept as two actions.

- id: video_wall_preset_execute
  label: Execute Video Wall Preset
  kind: action
  command: "set video wall preset {n1} {n2}"
  params:
    - name: n1
      type: integer
      description: "Video wall group ID / preset number (1~128)"
    - name: n2
      type: integer
      description: "Encoder ID (1~128, tx)"

- id: video_wall_preset_blank
  label: Video Wall Preset Blank Screen
  kind: action
  command: "set video wall preset {n1} mute {s1}"
  params:
    - name: n1
      type: integer
      description: "Video wall preset number"
    - name: s1
      type: integer
      description: "0 = Normal, 1 = Blank screen (sets Decoder N1 blank)"

- id: factory_default
  label: Reset to Factory Defaults
  kind: action
  command: "set factory default"
  params: []

- id: system_reboot
  label: Reboot Unit
  kind: action
  command: "set system reboot"
  params: []

- id: macro_run
  label: Run Macro
  kind: action
  command: "set macro {n1} run"
  params:
    - name: n1
      type: integer
      description: "Macro ID (1~16)"

- id: out_route
  label: Route Input to Output
  kind: action
  command: "set out {n1} route {n2}"
  params:
    - name: n1
      type: integer
      description: "Output number (1,2,3...)"
    - name: n2
      type: integer
      description: "Input number (1,2,3...)"

- id: all_rx_system_reboot
  label: Reboot All Decoders
  kind: action
  command: "set all rx system reboot"
  params: []

- id: decoder_system_reboot
  label: Reboot Decoder
  kind: action
  command: "set {n1} system reboot"
  params:
    - name: n1
      type: string
      description: "Decoder ID (rx1~rx256)"

- id: decoder_hdr_set
  label: Set Decoder HDR Mode
  kind: action
  command: "set {n1} hdr {s1}"
  params:
    - name: n1
      type: string
      description: "Decoder ID (rx1~rx256)"
    - name: s1
      type: integer
      description: "0 = Off, 1 = On"

- id: decoder_cec_set
  label: Set Decoder CEC Mode
  kind: action
  command: "set {n1} cec {s1}"
  params:
    - name: n1
      type: string
      description: "Decoder ID (rx1~rx256)"
    - name: s1
      type: integer
      description: "0 = Off, 1 = On"

- id: decoder_cec_route
  label: Route Decoder CEC From Encoder
  kind: action
  command: "set voip {n1} cec route {n2}"
  params:
    - name: n1
      type: string
      description: "Decoder ID (rx1~rx256)"
    - name: n2
      type: string
      description: "Encoder ID (tx1~tx128)"

- id: decoder_rotate_set
  label: Set Decoder Rotation
  kind: action
  command: "set {n1} rotate {s1}"
  params:
    - name: n1
      type: string
      description: "Decoder ID (rx1~rx256)"
    - name: s1
      type: integer
      description: "1 = 0 degrees, 2 = 180 degrees, 3 = 270 degrees"

- id: decoder_video_mute_set
  label: Set Decoder Video Mute (Blank Screen)
  kind: action
  command: "set {n1} video mute {s1}"
  params:
    - name: n1
      type: string
      description: "Decoder ID (rx1~rx256)"
    - name: s1
      type: integer
      description: "0 = Off, 1 = On"

- id: decoder_video_wall_stretch_set
  label: Set Decoder Video Wall Stretch Mode
  kind: action
  command: "set {n1} video wall stretch {s1}"
  params:
    - name: n1
      type: string
      description: "Decoder ID (rx1~rx256)"
    - name: s1
      type: integer
      description: "1 = Stretch Out, 2 = Fit In"

- id: decoder_resolution_set
  label: Set Decoder Output Resolution
  kind: action
  command: "set {n1} resolution {s1}"
  params:
    - name: n1
      type: string
      description: "Decoder ID (rx1~rx256)"
    - name: s1
      type: integer
      description: "1 = Pass Through, 2 = Native, 3 = 640x480p60, 4 = 800x600p60, 5 = 1024x768p60, 6 = 1280x768p60, 7 = 1280x800p60, 8 = 1280x1024p60, 9 = 1360x768p60, 10 = 1366x768p60, 11 = 1440x900p60, 12 = 1400x1050p60, 13 = 1600x900p60, 14 = 1600x1200p60, 15 = 1680x1050p60, 16 = 1920x1200p60, 17 = 480i60, 18 = 576i50, 19 = 480p60, 20 = 576p50, 21 = 720p25, 22 = 720p30, 23 = 720p50, 24 = 720p60, 25 = 1080i50, 26 = 1080i60, 27 = 1080p24, 28 = 1080p25, 29 = 1080p30, 30 = 1080p50, 31 = 1080p60, 32 = 3840x2160p24, 33 = 3840x2160p25, 34 = 3840x2160p30"

- id: all_out_route
  label: Route Input to All Outputs
  kind: action
  command: "set all out route {n1}"
  params:
    - name: n1
      type: integer
      description: "Input number (1,2,3...)"

- id: all_voip_ir_route
  label: Route IR Input to All AVoIP IR Outputs
  kind: action
  command: "set all voip ir route {n1}"
  params:
    - name: n1
      type: string
      description: "Encoder ID (tx1~tx128, IR input)"

- id: all_tx_system_reboot
  label: Reboot All Encoders
  kind: action
  command: "set all tx system reboot"
  params: []

- id: encoder_system_reboot
  label: Reboot Encoder
  kind: action
  command: "set {n1} system reboot"
  params:
    - name: n1
      type: string
      description: "Encoder ID (tx1~tx128)"

- id: audio_route
  label: Route Encoder Audio Input to Decoder Audio Output
  kind: action
  command: "set voip {n1} audio out o1 route {n2} {s1}"
  params:
    - name: n1
      type: string
      description: "Decoder ID (rx1~rx256)"
    - name: n2
      type: string
      description: "Encoder ID (tx1~tx128)"
    - name: s1
      type: integer
      description: "1 = HDMI audio input, 2 = Analog audio input. Source note: 'The values for S1 and S2 must match' (S2 is not defined in source)."

- id: all_voip_audio_route
  label: Route Encoder Audio Input to All Decoder Audio Outputs
  kind: action
  command: "set all voip audio out o1 route {n1} {s1}"
  params:
    - name: n1
      type: string
      description: "Encoder ID (tx1~tx128)"
    - name: s1
      type: integer
      description: "1 = HDMI audio input, 2 = Analog audio input. Source note: 'The values for S1 and S2 must match' (S2 is not defined in source)."

- id: encoder_audio_source_set
  label: Set Encoder Audio Input Source
  kind: action
  command: "set {n1} audio source {s1}"
  params:
    - name: n1
      type: string
      description: "Encoder ID (tx1~tx128)"
    - name: s1
      type: integer
      description: "1 = Auto, 2 = HDMI, 3 = Analog"
```

## Feedbacks
```yaml
- id: ok_ack
  type: string
  description: "Device returns 'OK' after a successful command (shown as '[OK]' appended to each command in the source)."
# UNRESOLVED: no other response formats, error responses, or query responses documented in source
```

## Variables
```yaml
# UNRESOLVED: no settable parameters outside discrete commands documented in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source
```

## Macros
```yaml
# UNRESOLVED: source documents a macro execution command (set macro N1 run, N1 = 1~16)
# but defines no multi-step macro sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Commands must be followed by a carriage return to execute; commands are not case-sensitive.
- By default the unit obtains its LAN 2 IP address via DHCP; check the unit's HDMI status display for the current address. Changing the unit's IP address changes the Telnet address accordingly.
- Port 23 taken from the source's Telnet example ("telnet 192.168.1.50 23"); the source does not separately state a default port.
- Source lists "set video wall preset N1 N2" twice with different capitalization and near-identical descriptions (video wall configuration / change video wall image to Encoder); merged into one action here since commands are case-insensitive.
- Source lists "set N1 system reboot" as two rows (Decoder rx1~rx256 and Encoder tx1~tx128); kept as two actions with distinct parameter domains.
- The audio routing commands reference an "S2" parameter in a note ("The values for S1 and S2 must match") that is never defined in the source.
<!-- UNRESOLVED: source document titled "OIP-D50C Telnet_RS-232 command set" — model applicability to OIP-D40E/D40D unverified. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: RS-232 serial parameters not stated in source. -->
<!-- UNRESOLVED: error/fault behavior and command response timing not stated in source. -->

## Provenance

```yaml
source_domains: []
source_urls: []
retrieved_at: 2026-09-23T18:49:13.343Z
last_checked_at: 2026-09-23T18:49:13.343Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-23T18:49:13.343Z
matched_actions: 22
action_count: 22
confidence: medium
summary: "All 22 spec actions verified in source; spec correctly split one source command for decoder/encoder variants. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document is titled \"OIP-D50C Telnet_RS-232 command set\" while the target device is the OIP-D40E/D40D; applicability of this command set to the D40E/D40D is not confirmed within the source."
- "no query/status commands documented in source."
- "no RS-232 serial parameters (baud rate, data bits, parity, stop bits, flow control) documented in source despite \"Telnet_RS-232\" title."
- "not stated in source"
- "no other response formats, error responses, or query responses documented in source"
- "no settable parameters outside discrete commands documented in source"
- "no unsolicited notifications documented in source"
- "source documents a macro execution command (set macro N1 run, N1 = 1~16)"
- "no safety warnings or interlock procedures in source"
- "source document titled \"OIP-D50C Telnet_RS-232 command set\" — model applicability to OIP-D40E/D40D unverified."
- "firmware version compatibility not stated in source."
- "RS-232 serial parameters not stated in source."
- "error/fault behavior and command response timing not stated in source."
- "model-specific source not located"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0

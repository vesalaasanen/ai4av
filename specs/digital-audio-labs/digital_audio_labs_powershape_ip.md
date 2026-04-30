---
schema_version: ai4av-public-spec-v1
device_id: digital-audio-labs/powershape-ps-2-1
entity_id: digital_audio_labs_powershape
spec_id: admin/digital-audio-labs-powershape
revision: 1
author: admin
title: "Digital Audio Labs PowerShape PS-2.1 Control Spec"
status: published
manufacturer: "Digital Audio Labs"
manufacturer_key: digital-audio-labs
model_family: "PowerShape PS-2.1"
aliases: []
compatible_with:
  manufacturers:
    - "Digital Audio Labs"
  models:
    - "PowerShape PS-2.1"
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: digital_audio_labs_powershape_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-24T14:41:25.165Z
retrieved_at: 2026-04-24T14:41:25.165Z
last_checked_at: 2026-04-24T14:41:25.165Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-24T14:41:25.165Z
  matched_actions: 38
  action_count: 38
  confidence: high
  summary: "Spec fully cross-checks against source. All actions, transport settings, and parameter definitions are consistent with vendor manual."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Digital Audio Labs PowerShape PS-2.1 Control Spec

## Summary
Class D amplifier with DSP. Supports RS-232 serial and TCP/IP (Telnet) control. Same command/response protocol over both transports: ASCII text commands starting with `=` and ending with `!`. Supports volume, mute, EQ, compression, crossover, presets, sleep mode, and VU metering.

<!-- UNRESOLVED: IR remote control is described but not machine-protocol; excluded from this spec -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # default; configurable: 23, 10001–10008, 50001–50008
serial:
  baud_rate: 9600  # default; configurable: 1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200
  data_bits: 8  # default; configurable: 7 or 8
  parity: none  # default; configurable: even, odd
  stop_bits: 1  # default; configurable: 1 or 2
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable      # reboot command present
- levelable      # volume, EQ, compression, makeup gain
- routable       # input selection (dienab), speaker offset
- queryable      # get commands for all parameters
```

## Actions
```yaml
- id: set_output_volume
  label: Set Output Volume
  kind: action
  params:
    - name: value
      type: integer
      description: Output volume in ½ dB steps, range -128 to 48 (-64 dB to +24 dB). -128 = mute.
  command: "=sov:{value}!"

- id: set_output_mute
  label: Set Output Mute
  kind: action
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: 0 = unmute, 1 = mute
  command: "=somute:{value}!"

- id: set_digital_input_volume
  label: Set Digital Input Volume
  kind: action
  params:
    - name: value
      type: integer
      description: Digital input volume in ½ dB steps, range -128 to 0 (-64 dBFS to 0 dBFS). -128 = mute.
  command: "=siv0:{value}!"

- id: set_analog_input_volume
  label: Set Analog Input Volume
  kind: action
  params:
    - name: value
      type: integer
      description: Analog input volume in ½ dB steps, range -128 to 0 (-64 dBFS to 0 dBFS). -128 = mute.
  command: "=siv1:{value}!"

- id: set_digital_input_mute
  label: Set Digital Input Mute
  kind: action
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: 0 = unmute, 1 = mute
  command: "=simute0:{value}!"

- id: set_analog_input_mute
  label: Set Analog Input Mute
  kind: action
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: 0 = unmute, 1 = mute
  command: "=simute1:{value}!"

- id: set_input_enable_mask
  label: Set Digital Input Enable Mask
  kind: action
  params:
    - name: value
      type: integer
      enum: [1, 2, 3]
      description: "1 = S/PDIF coax only, 2 = TOSLINK optical only, 3 = both enabled"
  command: "=sdienab:{value}!"

- id: set_output_eq_frequency
  label: Set Output EQ Frequency
  kind: action
  params:
    - name: band
      type: integer
      enum: [0, 1, 2, 3, 4]
      description: "EQ band: 0=bass, 1=mid1, 2=mid2, 3=mid3, 4=treble"
    - name: frequency
      type: integer
      description: Frequency in Hz, range 20–20000. Recommended values: 20,25,32,40,50,63,80,100,125,160,200,250,315,400,500,630,800,1000,1250,1600,2000,2500,3150,4000,5000,6300,8000,10000,12500,16000,20000
  command: "=s@eqf{band}:{frequency}!"

- id: set_output_eq_boost_cut
  label: Set Output EQ Boost/Cut
  kind: action
  params:
    - name: band
      type: integer
      enum: [0, 1, 2, 3, 4]
      description: "EQ band: 0=bass, 1=mid1, 2=mid2, 3=mid3, 4=treble"
    - name: value
      type: integer
      description: Boost/cut in ½ dB steps, range -24 to 24 (-12 dB to +12 dB). 0 = flat.
  command: "=seq{band}:{value}!"

- id: set_output_eq_q
  label: Set Output EQ Q
  kind: action
  params:
    - name: band
      type: integer
      enum: [1, 2, 3]
      description: "EQ band: 1=mid1, 2=mid2, 3=mid3"
    - name: value
      type: integer
      description: Q in 1/10 steps, range 1 to 100 (0.1 to 10.0). Recommended: 15 (1.5).
  command: "=seqq{band}:{value}!"

- id: set_compressor_threshold
  label: Set Compressor Threshold
  kind: action
  params:
    - name: value
      type: integer
      description: Threshold in ½ dB steps, range -128 to 0 (-64 dBFS to 0 dBFS). 0 = no compression.
  command: "=scpthr:{value}!"

- id: set_compressor_ratio
  label: Set Compressor Ratio
  kind: action
  params:
    - name: value
      type: integer
      description: Ratio in 1/10 steps, range 10 to 100 (1.0:1 to 10.0:1). 10 = no compression.
  command: "=scprat:{value}!"

- id: set_compressor_attack
  label: Set Compressor Attack Time
  kind: action
  params:
    - name: value
      type: integer
      description: Attack time in 2 msec steps, range 1 to 250 (2 msec to 500 msec).
  command: "=scpatt:{value}!"

- id: set_compressor_release
  label: Set Compressor Release Time
  kind: action
  params:
    - name: value
      type: integer
      description: Release time in 10 msec steps, range 1 to 250 (10 msec to 2500 msec).
  command: "=scprel:{value}!"

- id: set_compressor_makeup_gain
  label: Set Compressor Make-up Gain
  kind: action
  params:
    - name: value
      type: integer
      description: Make-up gain in ½ dB steps, range 0 to 48 (0 dB to +24 dB).
  command: "=scpmak:{value}!"

- id: set_stereo_effect
  label: Set Stereo Effect
  kind: action
  params:
    - name: value
      type: integer
      description: Stereo effect, range -100 to +100. +100 = widened, 0 = normal, -100 = mono.
  command: "=ssteff:{value}!"

- id: set_left_right_crossover_filter_type
  label: Set L/R Crossover Filter Type
  kind: action
  params:
    - name: value
      type: integer
      enum: [0, 1, 2, 3]
      description: "0=none, 1=Butterworth, 2=Linkwitz-Riley, 3=Bessel"
  command: "=sxomtype:{value}!"

- id: set_subwoofer_crossover_filter_type
  label: Set Sub Crossover Filter Type
  kind: action
  params:
    - name: value
      type: integer
      enum: [0, 1, 2, 3]
      description: "0=none, 1=Butterworth, 2=Linkwitz-Riley, 3=Bessel"
  command: "=sxostype:{value}!"

- id: set_left_right_crossover_frequency
  label: Set L/R Crossover Frequency
  kind: action
  params:
    - name: value
      type: integer
      description: Crossover edge frequency in Hz, range 20 to 20000.
  command: "=sxomf:{value}!"

- id: set_subwoofer_crossover_frequency
  label: Set Sub Crossover Frequency
  kind: action
  params:
    - name: value
      type: integer
      description: Crossover edge frequency in Hz, range 20 to 20000.
  command: "=sxosf:{value}!"

- id: set_crossover_high_pass_filter
  label: Set Crossover High-Pass Filter
  kind: action
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: "0 = 40 Hz HPF off, 1 = 40 Hz HPF on"
  command: "=sxohpf:{value}!"

- id: set_left_right_speaker_offset
  label: Set L/R Speaker Offset
  kind: action
  params:
    - name: value
      type: integer
      description: Offset in ½ dB steps, range -128 to 48 (-64 dB to +24 dB). -128 = mute.
  command: "=sspmoff:{value}!"

- id: set_subwoofer_speaker_offset
  label: Set Sub Speaker Offset
  kind: action
  params:
    - name: value
      type: integer
      description: Offset in ½ dB steps, range -128 to 48 (-64 dB to +24 dB). -128 = mute.
  command: "=sspsoff:{value}!"

- id: load_preset
  label: Load Preset
  kind: action
  params:
    - name: value
      type: integer
      description: "Preset number: 1–4 (user), 11–13 (factory). 11=2.0 stereo, 12=3.0 mono, 13=2.1 stereo"
  command: "=slprs:{value}!"

- id: save_preset
  label: Save Preset
  kind: action
  params:
    - name: value
      type: integer
      description: "User preset number: 1–4"
  command: "=ssprs:{value}!"

- id: reboot
  label: Reboot Amplifier
  kind: action
  params:
    - name: value
      type: integer
      description: Must be 1.
  command: "=sreboot:1!"

- id: set_sleep_delay
  label: Set Sleep Delay
  kind: action
  params:
    - name: value
      type: integer
      description: Delay in minutes, range 0 to 120. 0 = disabled.
  command: "=ssleepdly:{value}!"

- id: set_sleep_threshold
  label: Set Sleep Threshold
  kind: action
  params:
    - name: value
      type: integer
      description: Audio level threshold in dBFS, range -80 to -30.
  command: "=ssleepthr:{value}!"

- id: set_serial_baud_rate
  label: Set Serial Baud Rate
  kind: action
  params:
    - name: value
      type: integer
      enum: [1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200]
      description: Baud rate. Takes effect after next power-on or reboot.
  command: "=sserbaud:{value}!"

- id: set_serial_data_format
  label: Set Serial Data Format
  kind: action
  params:
    - name: value
      type: string
      enum: ["8N1", "8N2", "7E1", "7E2", "7O1", "7O2"]
      description: "8N1=8bit/no parity/1stop, 8N2=8/none/2, 7E1=7/even/1, 7E2=7/even/2, 7O1=7/odd/1, 7O2=7/odd/2. Takes effect after next power-on or reboot."
  command: "=sserfmt:{value}!"

- id: set_network_ip_address
  label: Set Network IP Address
  kind: action
  params:
    - name: value
      type: string
      description: Static IP address (e.g. "10.1.2.3"). Use "0.0.0.0" for dynamic (DHCP/BOOTP/AutoIP). Takes effect after next power-on or reboot.
  command: "=snetip:{value}!"

- id: set_network_subnet_mask
  label: Set Network Subnet Mask
  kind: action
  params:
    - name: value
      type: string
      description: Subnet mask (e.g. "255.255.255.0"). Use "0.0.0.0" for dynamic IP. Takes effect after next power-on or reboot.
  command: "=snetsubm:{value}!"

- id: set_network_gateway
  label: Set Network Gateway
  kind: action
  params:
    - name: value
      type: string
      description: Gateway IP address. Use "0.0.0.0" for dynamic IP. Takes effect after next power-on or reboot.
  command: "=snetgw:{value}!"

- id: set_network_telnet_port
  label: Set Network Telnet Port
  kind: action
  params:
    - name: value
      type: integer
      enum: [23, 10001, 10002, 10003, 10004, 10005, 10006, 10007, 10008, 50001, 50002, 50003, 50004, 50005, 50006, 50007, 50008]
      description: TCP port for Telnet server. Takes effect after next power-on or reboot.
  command: "=snetport:{value}!"

- id: set_vu_meter_rate
  label: Set VU Meter Rate
  kind: action
  params:
    - name: value
      type: integer
      description: VU reports per second, range 0 to 30. 0 = off.
  command: "=svurat:{value}!"
- id: step_output_volume
  label: Step Output Volume
  kind: action
  params:
    - name: value
      type: integer
      description: Relative output volume adjustment in ½ dB steps, range -12 to 12 (-6.0 dB to +6.0 dB). Amplifier responds with new absolute volume level.
  command: "=sovstep:{value}!"

- id: step_digital_input_volume
  label: Step Digital Input Volume
  kind: action
  params:
    - name: value
      type: integer
      description: Relative digital input volume adjustment in ½ dB steps, range -12 to 12 (-6.0 dB to +6.0 dB). Amplifier responds with new absolute volume level.
  command: "=siv0step:{value}!"

- id: step_analog_input_volume
  label: Step Analog Input Volume
  kind: action
  params:
    - name: value
      type: integer
      description: Relative analog input volume adjustment in ½ dB steps, range -12 to 12 (-6.0 dB to +6.0 dB). Amplifier responds with new absolute volume level.
  command: "=siv1step:{value}!"
```

## Feedbacks
```yaml
- id: output_volume
  type: integer
  description: Output volume in ½ dB steps, range -128 to 48. Responds to "=sov!" or "=gov!"
  values: [-128, 48]
  command: "=sov:{value}!"

- id: output_mute_state
  type: enum
  description: Output mute state. 0 = not muted, 1 = muted.
  values: [0, 1]
  command: "=somute:{value}!"

- id: digital_input_volume
  type: integer
  description: Digital input volume in ½ dB steps, range -128 to 0.
  command: "=siv0:{value}!"

- id: analog_input_volume
  type: integer
  description: Analog input volume in ½ dB steps, range -128 to 0.
  command: "=siv1:{value}!"

- id: digital_input_mute_state
  type: enum
  values: [0, 1]
  command: "=simute0:{value}!"

- id: analog_input_mute_state
  type: enum
  values: [0, 1]
  command: "=simute1:{value}!"

- id: digital_input_enable_mask
  type: enum
  values: [1, 2, 3]
  description: "1=S/PDIF only, 2=TOSLINK only, 3=both"
  command: "=sdienab:{value}!"

- id: boot_firmware_version
  type: string
  description: Boot firmware version. Format: major/minor combined (e.g. 2015 = v2.15).
  command: "=gverboot!"

- id: cpu_firmware_version
  type: string
  description: Main CPU firmware version. Same format as verboot.
  command: "=gvercpu!"

- id: dsp1_firmware_version
  type: string
  description: DSP1 firmware version. Same format as verboot.
  command: "=gverdsp1!"

- id: dsp2_firmware_version
  type: string
  description: DSP2 firmware version. Same format as verboot.
  command: "=gverdsp2!"

- id: all_configuration
  type: string
  description: Returns all configuration values as if a get was issued for each parameter. Does not include status or VU.
  command: "=gall!"

- id: assigned_ip_address
  type: string
  description: Dynamically assigned IP address (DHCP/BOOTP/AutoIP).
  command: "=gnetasgip!"

- id: assigned_subnet_mask
  type: string
  description: Dynamically assigned subnet mask.
  command: "=gnetasgsubm!"

- id: assigned_gateway
  type: string
  description: Dynamically assigned gateway address.
  command: "=gnetasggw!"

- id: mac_address
  type: string
  description: MAC address of network port.
  command: "=gnetmacaddr!"

- id: vu_meter_report
  type: string
  description: 4-character VU meter string. Characters: compressor RMS input, gain reduction, left peak, right peak. Values: 0–9, A–G (0 = <-65 dBFS, G = 0 dBFS).
  command: "=svurat:{rate}!"  # enables auto-reports at specified rate
```

## Variables
```yaml
- id: output_eq_frequency
  type: integer
  get_command: "=geqf{bands}!"
  set_command: "=seqf{bands}:{value}!"
  description: EQ band frequency in Hz. Bands 0–4 (bass, mid1, mid2, mid3, treble).
  range: [20, 20000]

- id: output_eq_boost_cut
  type: integer
  get_command: "=geq{bands}!"
  set_command: "=seq{bands}:{value}!"
  description: EQ boost/cut in ½ dB steps. Range -24 to 24.
  range: [-24, 24]

- id: output_eq_q
  type: integer
  get_command: "=geqq{bands}!"
  set_command: "=seqq{bands}:{value}!"
  description: EQ Q factor in 1/10 steps (0.1 to 10.0). Only mid bands 1–3 adjustable.
  range: [1, 100]

- id: compressor_threshold
  type: integer
  get_command: "=gcpthr!"
  set_command: "=scpthr:{value}!"
  description: Compressor threshold in ½ dB steps, range -128 to 0.
  range: [-128, 0]

- id: compressor_ratio
  type: integer
  get_command: "=gcprat!"
  set_command: "=scprat:{value}!"
  description: Compression ratio in 1/10 steps (1.0:1 to 10.0:1).
  range: [10, 100]

- id: compressor_attack
  type: integer
  get_command: "=gcpatt!"
  set_command: "=scpatt:{value}!"
  description: Attack time in 2 msec steps. Range 1–250.
  range: [1, 250]

- id: compressor_release
  type: integer
  get_command: "=gcprel!"
  set_command: "=scprel:{value}!"
  description: Release time in 10 msec steps. Range 1–250.
  range: [1, 250]

- id: compressor_makeup_gain
  type: integer
  get_command: "=gcpmak!"
  set_command: "=scpmak:{value}!"
  description: Make-up gain in ½ dB steps. Range 0–48.
  range: [0, 48]

- id: stereo_effect
  type: integer
  get_command: "=gsteff!"
  set_command: "=ssteff:{value}!"
  description: Stereo effect. Range -100 to +100. 0 = normal.
  range: [-100, 100]

- id: left_right_crossover_type
  type: enum
  get_command: "=gxomtype!"
  set_command: "=sxomtype:{value}!"
  values: [0, 1, 2, 3]
  description: "0=none, 1=Butterworth, 2=Linkwitz-Riley, 3=Bessel"

- id: subwoofer_crossover_type
  type: enum
  get_command: "=gxostype!"
  set_command: "=sxostype:{value}!"
  values: [0, 1, 2, 3]
  description: "0=none, 1=Butterworth, 2=Linkwitz-Riley, 3=Bessel"

- id: left_right_crossover_frequency
  type: integer
  get_command: "=gxomf!"
  set_command: "=sxomf:{value}!"
  description: Crossover frequency in Hz. Range 20–20000.
  range: [20, 20000]

- id: subwoofer_crossover_frequency
  type: integer
  get_command: "=gxosf!"
  set_command: "=sxosf:{value}!"
  description: Crossover frequency in Hz. Range 20–20000.
  range: [20, 20000]

- id: crossover_high_pass_filter
  type: enum
  get_command: "=gxohpf!"
  set_command: "=sxohpf:{value}!"
  values: [0, 1]
  description: "0 = 40 Hz HPF off, 1 = 40 Hz HPF on"

- id: left_right_speaker_offset
  type: integer
  get_command: "=gspmoff!"
  set_command: "=sspmoff:{value}!"
  description: Speaker offset in ½ dB steps. Range -128 to 48.
  range: [-128, 48]

- id: subwoofer_speaker_offset
  type: integer
  get_command: "=gspsoff!"
  set_command: "=sspsoff:{value}!"
  description: Speaker offset in ½ dB steps. Range -128 to 48.
  range: [-128, 48]

- id: sleep_delay
  type: integer
  get_command: "=gsleepdly!"
  set_command: "=ssleepdly:{value}!"
  description: Sleep delay in minutes. Range 0–120. 0 = disabled.
  range: [0, 120]

- id: sleep_threshold
  type: integer
  get_command: "=gsleepthr!"
  set_command: "=ssleepthr:{value}!"
  description: Sleep threshold in dBFS. Range -80 to -30.
  range: [-80, -30]

- id: serial_baud_rate
  type: enum
  get_command: "=gserbaud!"
  set_command: "=sserbaud:{value}!"
  values: [1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200]
  description: Serial baud rate. Takes effect after reboot.

- id: serial_data_format
  type: enum
  get_command: "=gserfmt!"
  set_command: "=sserfmt:{value}!"
  values: ["8N1", "8N2", "7E1", "7E2", "7O1", "7O2"]
  description: Serial data format. Takes effect after reboot.

- id: network_ip_address
  type: string
  get_command: "=gnetip!"
  set_command: "=snetip:{value}!"
  description: Network IP address. "0.0.0.0" = dynamic. Takes effect after reboot.

- id: network_subnet_mask
  type: string
  get_command: "=gnetsubm!"
  set_command: "=snetsubm:{value}!"
  description: Subnet mask. Takes effect after reboot.

- id: network_gateway
  type: string
  get_command: "=gnetgw!"
  set_command: "=snetgw:{value}!"
  description: Gateway IP. Takes effect after reboot.

- id: network_telnet_port
  type: enum
  get_command: "=gnetport!"
  set_command: "=snetport:{value}!"
  values: [23, 10001, 10002, 10003, 10004, 10005, 10006, 10007, 10008, 50001, 50002, 50003, 50004, 50005, 50006, 50007, 50008]
  description: Telnet TCP port. Takes effect after reboot.

- id: vu_meter_rate
  type: integer
  get_command: "=gvurat!"
  set_command: "=svurat:{value}!"
  description: VU reports per second. Range 0–30. 0 = off.
  range: [0, 30]
```

## Events
```yaml
# UNRESOLVED: the source describes no unsolicited event messages.
# VU meter reports are sent automatically when vurat is set > 0, but only in response to a prior set command.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for:
  - reboot  # command reboots device; may cause audio dropout
interlocks: []
# Output volume levels above +12.5 dB should be used with caution (per source).
# UNRESOLVED: no formal interlock procedure described in source
```

## Notes
Command format: `=gITEM!` (get) or `=sITEM:VALUE!` (set). Response mirrors set format. Characters outside `=` and `!` are ignored (allows CR/LF line termination).

Network port supports one client via Telnet. IP address assignment: DHCP/BOOTP, AutoIP (169.254.xxx.yyy), or static. All network and serial config changes take effect after next power-on or reboot.

<!-- UNRESOLVED: IR remote control uses NEC protocol — documented for user convenience but not machine-protocol; excluded from this spec -->
<!-- UNRESOLVED: specific firmware version compatibility not stated in source -->
<!-- UNRESOLVED: default VU meter state (rate=0, reports off) on power-on not explicitly confirmed -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: digital_audio_labs_powershape_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-24T14:41:25.165Z
retrieved_at: 2026-04-24T14:41:25.165Z
last_checked_at: 2026-04-24T14:41:25.165Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-24T14:41:25.165Z
matched_actions: 38
action_count: 38
confidence: high
summary: "Spec fully cross-checks against source. All actions, transport settings, and parameter definitions are consistent with vendor manual."
```

## Known Gaps

```yaml
[]
```

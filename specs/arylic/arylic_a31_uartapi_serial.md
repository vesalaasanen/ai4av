---
spec_id: admin/arylic-a31-platform-uart-api
schema_version: ai4av-public-spec-v1
revision: 1
title: "Arylic A31 Platform UART API Control Spec"
manufacturer: Arylic
model_family: "A31 Platform"
aliases: []
compatible_with:
  manufacturers:
    - Arylic
  models:
    - "A31 Platform"
    - "Up2Stream PRO"
    - MA400
    - HA400
    - M400
    - H400
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - developer.arylic.com
source_urls:
  - https://developer.arylic.com/uartapi/
retrieved_at: 2026-05-15T00:36:07.249Z
last_checked_at: 2026-05-15T21:12:43.521Z
generated_at: 2026-05-15T21:12:43.521Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact product model mapping to A31 platform not fully specified — source lists Up2Stream PRO, MA400/HA400, M400/H400"
  - "TCP port number not stated in source"
  - "all settable parameters are modeled as action params with feedback counterparts above"
  - "no explicit safety warnings or interlock procedures in source"
  - "TRE/MID tone ranges not explicitly stated (assumed [-10,10] by analogy with BAS)"
  - "volume range stated as example values only; exact range likely [0,100] but upper bound not confirmed"
  - "PST preset number range not stated"
  - "response timing / latency characteristics not stated"
verification:
  verdict: verified
  checked_at: 2026-05-15T21:12:43.521Z
  matched_actions: 44
  action_count: 44
  confidence: medium
  summary: "All 44 spec actions matched literal command tokens in source with verified transport parameters and zero extra source commands. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# Arylic A31 Platform UART API Control Spec

## Summary
Arylic A31-based streaming amplifier and DIY board platform controllable via UART (RS-232C) serial interface. Covers device status, playback control, audio DSP, multi-zone management (MA400/HA400), and default configuration APIs. TCP transport also supported on BP10XX-based hardware by wrapping UART commands.

<!-- UNRESOLVED: exact product model mapping to A31 platform not fully specified — source lists Up2Stream PRO, MA400/HA400, M400/H400 -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
# TCP wrapping: MCU+PAS+RAKOIT:{uart_message}& - available on BP10XX-based models
# UNRESOLVED: TCP port number not stated in source
```

## Traits
```yaml
traits:
  - powerable     # SYS:STANDBY command present
  - queryable     # numerous query commands returning state (VOL, MUT, SRC, etc.)
  - routable      # SRC: command selects input source
  - levelable     # VOL, BAS, TRE, MID, BAL - continuous range parameters
```

## Actions
```yaml
actions:
  - id: factory_reset
    label: Factory Reset
    kind: action
    command: SYS:RESET
    params: []

  - id: reboot
    label: Reboot Device
    kind: action
    command: SYS:REBOOT
    params: []

  - id: standby
    label: Enter Standby
    kind: action
    command: SYS:STANDBY
    params: []
    notes: Cannot wake via UART on some models

  - id: set_device_name
    label: Set Device Name
    kind: action
    command: "NAM:{hextext}"
    params:
      - name: hextext
        type: string
        description: "UTF-8 device name encoded as hex (e.g. 4261636B79617264 = Backyard)"

  - id: trigger_wifi_setup
    label: Trigger WiFi Setup
    kind: action
    command: WRS
    params: []

  - id: set_pin_code_enabled
    label: Set Bluetooth Pin Code Enabled
    kind: action
    command: "COE:{onoff}"
    params:
      - name: onoff
        type: integer
        description: "1=on, 0=off. Device reboots on change."

  - id: set_bluetooth_pin
    label: Set Bluetooth Pin Code
    kind: action
    command: "COD:{pin}"
    params:
      - name: pin
        type: string
        description: "4-digit pin, default 0000"

  - id: select_source
    label: Select Input Source
    kind: action
    command: "SRC:{source}"
    params:
      - name: source
        type: enum
        values: [NET, BT, USBDAC, LINE-IN, OPT, COAX, LINE-IN2, OPT2, COAX2, HDMI]
        description: "Input source identifier"

  - id: play_pause
    label: Play / Pause
    kind: action
    command: POP
    params: []
    notes: Available in network and bluetooth playback

  - id: stop
    label: Stop Playback
    kind: action
    command: STP
    params: []
    notes: Network playback only

  - id: next_track
    label: Next Track
    kind: action
    command: NXT
    params: []

  - id: previous_track
    label: Previous Track
    kind: action
    command: PRE
    params: []

  - id: play_preset
    label: Play Preset
    kind: action
    command: "PST:{preset}"
    params:
      - name: preset
        type: integer
        description: Preset playlist number

  - id: set_loop_mode
    label: Set Loop / Shuffle Mode
    kind: action
    command: "LPM:{loopmode}"
    params:
      - name: loopmode
        type: enum
        values: [REPEATALL, REPEATONE, REPEATSHUFFLE, SHUFFLE, SEQUENCE]
        description: Playback loop/shuffle mode

  - id: bluetooth_disconnect
    label: Bluetooth Disconnect / Reconnect
    kind: action
    command: "BTC:{onoff}"
    params:
      - name: onoff
        type: integer
        description: "0=disconnect, 1=reconnect"

  - id: set_autoplay
    label: Set Autoplay
    kind: action
    command: "APL:{onoff}"
    params:
      - name: onoff
        type: integer
        description: "1=enable (play last playlist on boot), 0=disable"

  - id: set_audio_output
    label: Set Audio Output
    kind: action
    command: "AUD:{onoff}"
    params:
      - name: onoff
        type: integer
        description: "1=on, 0=off"

  - id: set_volume
    label: Set Volume
    kind: action
    command: "VOL:{volume}"
    params:
      - name: volume
        type: integer
        description: "Volume level [0,100]"

  - id: set_mute
    label: Set Mute
    kind: action
    command: "MUT:{onoff}"
    params:
      - name: onoff
        type: integer
        description: "1=mute, 0=unmute"

  - id: set_bass
    label: Set Bass Tone
    kind: action
    command: "BAS:{tone}"
    params:
      - name: tone
        type: integer
        description: "Bass level [-10,10] dB"

  - id: set_treble
    label: Set Treble Tone
    kind: action
    command: "TRE:{tone}"
    params:
      - name: tone
        type: integer
        description: "Treble level [-10,10] dB (range inferred from BAS)"

  - id: set_mid
    label: Set Mid Tone
    kind: action
    command: "MID:{tone}"
    params:
      - name: tone
        type: integer
        description: "Mid level (range not explicitly stated, likely [-10,10] dB)"

  - id: set_virtual_bass
    label: Set Virtual Bass
    kind: action
    command: "VBS:{onoff}"
    params:
      - name: onoff
        type: integer
        description: "1=enable, 0=disable"

  - id: set_balance
    label: Set Audio Balance
    kind: action
    command: "BAL:{balance}"
    params:
      - name: balance
        type: integer
        description: "Balance [-100,100]. Positive attenuates left, negative attenuates right."

  - id: set_fixed_volume
    label: Set Fixed Volume Output
    kind: action
    command: "VOF:{volume}"
    params:
      - name: volume
        type: integer
        description: "Fixed output [0,100]. 0 disables fixed volume."

  - id: set_group_volume
    label: Set Multiroom Group Volume
    kind: action
    command: "VOG:{volume}"
    params:
      - name: volume
        type: integer
        description: "Volume for grouped playback"

  - id: set_eq_group
    label: Set EQ Group
    kind: action
    command: "EQS:{eqidx}"
    params:
      - name: eqidx
        type: integer
        description: "EQ group index (0=Flat, 1=Classical, 2=Pop, 3=Jazz, 4=Rock, 5=Vocal per example)"

  - id: set_volume_step
    label: Set Volume Step
    kind: action
    command: "VST:{step}"
    params:
      - name: step
        type: integer
        description: "Volume increment per button press [0,10]"

  - id: set_eq_enabled
    label: Set EQ Enabled
    kind: action
    command: "EQE:{onoff}"
    params:
      - name: onoff
        type: integer

  - id: set_crossfilter_enabled
    label: Set Crossfilter Enabled
    kind: action
    command: "CFE:{onoff}"
    params:
      - name: onoff
        type: integer
        description: "Enables high-pass on stereo out, low-pass on DAC-X out"

  - id: set_crossfilter_freq
    label: Set Crossfilter Frequency
    kind: action
    command: "CFF:{cffreq}"
    params:
      - name: cffreq
        type: integer
        description: "Crossover frequency [50,300]"

  - id: set_led
    label: Set LED / Display
    kind: action
    command: "LED:{onoff}"
    params:
      - name: onoff
        type: integer

  - id: set_beep
    label: Set Beep Sound
    kind: action
    command: "BEP:{onoff}"
    params:
      - name: onoff
        type: integer
        description: "Beep on key press"

  - id: set_prompt_voice
    label: Set Prompt Voice
    kind: action
    command: "PMT:{onoff}"
    params:
      - name: onoff
        type: integer
        description: "Device reboots on change"

  - id: set_auto_switch
    label: Set Auto Switch Mode
    kind: action
    command: "ASW:{onoff}"
    params:
      - name: onoff
        type: integer
        description: "Auto-return to previous source on disconnect"

  - id: set_volume_sync
    label: Set Volume Sync
    kind: action
    command: "VOS:{onoff}"
    params:
      - name: onoff
        type: integer
        description: "Sync master volume changes to multiroom slaves"

  - id: set_standby_on_power
    label: Set Standby on Power
    kind: action
    command: "SOP:{onoff}"
    params:
      - name: onoff
        type: integer
        description: "Enter standby when power supplied"

  - id: set_max_volume
    label: Set Max Volume
    kind: action
    command: "MXV:{volume}"
    params:
      - name: volume
        type: integer
        description: "Maximum volume [30,100]"

  - id: set_mute_delay
    label: Set Auto-Mute Delay
    kind: action
    command: "DLY:{mute_delay}"
    params:
      - name: mute_delay
        type: integer
        description: "No-audio timeout before auto mute [0,32767]"

  - id: set_power_on_mode
    label: Set Power-On Input Source
    kind: action
    command: "POM:{source}"
    params:
      - name: source
        type: enum
        values: [NET, BT, USBDAC, LINE-IN, OPT, COAX, LINE-IN2, OPT2, COAX2, HDMI]
        description: "Source to auto-select at power on"

  - id: zone_command
    label: Send Command to Zone
    kind: action
    command: "ZON:{logiczoneid}:{msg}"
    params:
      - name: logiczoneid
        type: integer
        description: "Logical zone ID [1,127]"
      - name: msg
        type: string
        description: "Any UART command to redirect to the zone"
    notes: MA400/HA400/M400/H400 4-zone models only

  - id: set_zone_logic_id
    label: Set Zone Logic ID
    kind: action
    command: "IDS:{zoneid}:{logiczoneid}"
    params:
      - name: zoneid
        type: integer
        description: Physical zone ID
      - name: logiczoneid
        type: integer
        description: "Logical zone ID [1,127]"
    notes: For cascading multiple MA400 units

  - id: set_default_config
    label: Set Default Configuration
    kind: action
    command: "DEF:{subcmd}:{param}"
    params:
      - name: subcmd
        type: string
        description: "Sub-API command (LTP, NAM, FXN, VOL, VBS, PMT, VOS, BEP, MDL, VST, SAV, SEN, POM, MXV, COE, COD, LAP)"
      - name: param
        type: string
        description: "Value for the sub-API command"
    notes: Must send DEF:SAV last and factory reset to apply

  - id: save_defaults
    label: Save Default Configuration
    kind: action
    command: DEF:SAV
    params: []
    notes: Must be sent last in default config sequence; factory reset required after
```

## Feedbacks
```yaml
feedbacks:
  - id: device_status
    type: string
    command: STA
    response: "STA:{states}"
    description: "CSV: source,mute,volume,treble,bass,net,internet,playing,led,upgrading"

  - id: internet_status
    type: enum
    values: ["0", "1"]
    command: WWW
    response: "WWW:{onoff}"
    description: Unsolicited on state change

  - id: device_name
    type: string
    command: NAM
    response: "NAM:{hextext}"
    description: "UTF-8 name as hex-encoded string"

  - id: ethernet_status
    type: enum
    values: ["0", "1"]
    command: ETH
    response: "ETH:{onoff}"
    description: Unsolicited on state change

  - id: wifi_status
    type: enum
    values: ["0", "1"]
    command: WIF
    response: "WIF:{onoff}"
    description: Unsolicited on state change

  - id: wifi_signal
    type: integer
    command: WSS
    response: "WSS:{rssi}"
    description: WiFi RSSI, host must query proactively

  - id: bluetooth_signal
    type: integer
    command: BSS
    response: "BSS:{rssi}"
    description: Bluetooth RSSI, not all models

  - id: ip_address
    type: string
    command: IPA
    response: "IPA:{ip}"
    description: Device IP address, unsolicited on change

  - id: local_time
    type: string
    command: TME
    response: "TME:{time}"
    description: 'Format: YYYY-MM-DD HH:MM:SS (+offset)'

  - id: firmware_version
    type: string
    command: VER
    response: "VER:{version}"
    description: "version-gitcommit-apilevel joined by -"

  - id: current_source
    type: enum
    values: [NET, BT, USBDAC, LINE-IN, OPT, COAX, LINE-IN2, OPT2, COAX2, HDMI]
    command: SRC
    response: "SRC:{source}"

  - id: playing_state
    type: enum
    values: ["0", "1"]
    command: PLA
    response: "PLA:{onoff}"

  - id: multiroom_channel
    type: enum
    values: [S, L, R]
    command: CHN
    response: "CHN:{channel}"
    description: "Stereo / Left / Right - read only"

  - id: multiroom_mode
    type: enum
    values: [S, M, N]
    command: MRM
    response: "MRM:{mrmmode}"
    description: "Slave / Master / Normal - read only"

  - id: track_title
    type: string
    command: TIT
    response: "TIT:{hextext}"
    description: "Hex-encoded title. Not available over TCP."

  - id: track_artist
    type: string
    command: ART
    response: "ART:{hextext}"
    description: "Hex-encoded artist. Not available over TCP."

  - id: track_album
    type: string
    command: ALB
    response: "ALB:{hextext}"
    description: "Hex-encoded album. Not available over TCP."

  - id: track_vendor
    type: enum
    values: [spotify, qplay, dlna, airplay, upnp, phone, usb, tidal, napster, qobuz, amazon, tunein, iheart, vtuner, http, other]
    command: VND
    response: "VND:{vendor}"
    description: Not available over TCP

  - id: track_elapsed
    type: string
    command: ELP
    response: "ELP:{elapsed}"
    description: "Format: elapsed_ms/total_ms. Not available over TCP."

  - id: playlist_info
    type: string
    command: PLI
    response: "PLI:{playlist_info}"
    description: "Format: index/count (1-based)"

  - id: current_volume
    type: integer
    command: VOL
    response: "VOL:{volume}"

  - id: mute_state
    type: enum
    values: ["0", "1"]
    command: MUT
    response: "MUT:{onoff}"

  - id: bass_tone
    type: integer
    command: BAS
    response: "BAS:{tone}"

  - id: treble_tone
    type: integer
    command: TRE
    response: "TRE:{tone}"

  - id: mid_tone
    type: integer
    command: MID
    response: "MID:{tone}"

  - id: virtual_bass
    type: enum
    values: ["0", "1"]
    command: VBS
    response: "VBS:{onoff}"

  - id: balance
    type: integer
    command: BAL
    response: "BAL:{balance}"

  - id: fixed_volume
    type: integer
    command: VOF
    response: "VOF:{volume}"

  - id: eq_list
    type: string
    command: PEQ
    response: "PEQ:{eqlist}"
    description: "Format: idx@name separated by commas"

  - id: eq_group
    type: integer
    command: EQS
    response: "EQS:{eqidx}"

  - id: eq_enabled
    type: enum
    values: ["0", "1"]
    command: EQE
    response: "EQE:{onoff}"

  - id: crossfilter_enabled
    type: enum
    values: ["0", "1"]
    command: CFE
    response: "CFE:{onoff}"

  - id: crossfilter_freq
    type: integer
    command: CFF
    response: "CFF:{cffreq}"

  - id: available_sources
    type: string
    command: LST
    response: "LST:{sources}"
    description: "Comma-separated source identifiers"

  - id: zone_logic_ids
    type: string
    command: IDS
    response: "IDS:{ids}"
    description: "Comma-separated logic IDs for all zones"

  - id: autoplay_state
    type: enum
    values: ["0", "1"]
    command: APL
    response: "APL:{onoff}"

  - id: loop_mode
    type: enum
    values: [REPEATALL, REPEATONE, REPEATSHUFFLE, SHUFFLE, SEQUENCE]
    command: LPM
    response: "LPM:{loopmode}"

  - id: pin_code_enabled
    type: enum
    values: ["0", "1"]
    command: COE
    response: "COE:{onoff}"

  - id: led_state
    type: enum
    values: ["0", "1"]
    command: LED
    response: "LED:{onoff}"

  - id: beep_state
    type: enum
    values: ["0", "1"]
    command: BEP
    response: "BEP:{onoff}"

  - id: prompt_voice_state
    type: enum
    values: ["0", "1"]
    command: PMT
    response: "PMT:{onoff}"

  - id: auto_switch_state
    type: enum
    values: ["0", "1"]
    command: ASW
    response: "ASW:{onoff}"

  - id: volume_sync_state
    type: enum
    values: ["0", "1"]
    command: VOS
    response: "VOS:{onoff}"

  - id: standby_on_power_state
    type: enum
    values: ["0", "1"]
    command: SOP
    response: "SOP:{onoff}"

  - id: max_volume
    type: integer
    command: MXV
    response: "MXV:{volume}"

  - id: mute_delay
    type: integer
    command: DLY
    response: "DLY:{mute_delay}"

  - id: audio_output_state
    type: enum
    values: ["0", "1"]
    command: AUD
    response: "AUD:{onoff}"
```

## Variables
```yaml
variables: []
# UNRESOLVED: all settable parameters are modeled as action params with feedback counterparts above
```

## Events
```yaml
events:
  - id: internet_status_changed
    command: WWW
    response: "WWW:{onoff}"
    description: Unsolicited when internet connectivity changes

  - id: ethernet_status_changed
    command: ETH
    response: "ETH:{onoff}"
    description: Unsolicited when ethernet connectivity changes

  - id: wifi_status_changed
    command: WIF
    response: "WIF:{onoff}"
    description: Unsolicited when WiFi connectivity changes

  - id: ip_address_changed
    command: IPA
    response: "IPA:{ip}"
    description: Unsolicited when IP address changes

  - id: track_metadata_changed
    command: TIT / ART / ALB
    description: "Unsolicited track title/artist/album notifications (UART only, not TCP)"

  - id: state_changed
    description: "Source states messages may be received without query when device state changes"
```

## Macros
```yaml
macros: []
# No multi-step sequences explicitly described in source beyond DEF:SAV workflow
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in source
# Note: SYS:RESET performs factory reset - irreversible action
# Note: COE, PMT commands cause device reboot
# Note: SYS:STANDBY cannot be woken via UART on some models
```

## Notes
- All commands are 3-character mnemonics separated by `:` and terminated with `;` over UART.
- Sending a command without a parameter queries current state; sending with a parameter sets state.
- TCP transport wraps UART commands as `MCU+PAS+RAKOIT:{uart_message}&` — available only on BP10XX-based hardware (MCU silkprint reads BP1048 or BP1064).
- TIT, ART, ALB, VND, ELP metadata commands do not work over TCP.
- 4-zone models (MA400/HA400/M400/H400) use `ZON:{zoneid}:{cmd}` prefix to address individual zones.
- Multiple MA400 units can be cascaded via RS-232 after assigning unique logical zone IDs with `IDS`.
- Default configuration API (`DEF:` prefix) requires `DEF:SAV` as the final command, followed by factory reset.

<!-- UNRESOLVED: TCP port number not stated in source -->
<!-- UNRESOLVED: TRE/MID tone ranges not explicitly stated (assumed [-10,10] by analogy with BAS) -->
<!-- UNRESOLVED: volume range stated as example values only; exact range likely [0,100] but upper bound not confirmed -->
<!-- UNRESOLVED: PST preset number range not stated -->
<!-- UNRESOLVED: response timing / latency characteristics not stated -->

## Provenance

```yaml
source_domains:
  - developer.arylic.com
source_urls:
  - https://developer.arylic.com/uartapi/
retrieved_at: 2026-05-15T00:36:07.249Z
last_checked_at: 2026-05-15T21:12:43.521Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-15T21:12:43.521Z
matched_actions: 44
action_count: 44
confidence: medium
summary: "All 44 spec actions matched literal command tokens in source with verified transport parameters and zero extra source commands. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact product model mapping to A31 platform not fully specified — source lists Up2Stream PRO, MA400/HA400, M400/H400"
- "TCP port number not stated in source"
- "all settable parameters are modeled as action params with feedback counterparts above"
- "no explicit safety warnings or interlock procedures in source"
- "TRE/MID tone ranges not explicitly stated (assumed [-10,10] by analogy with BAS)"
- "volume range stated as example values only; exact range likely [0,100] but upper bound not confirmed"
- "PST preset number range not stated"
- "response timing / latency characteristics not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0

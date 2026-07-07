---
spec_id: admin/lectrosonics-dsqd
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lectrosonics DSQD Control Spec"
manufacturer: Lectrosonics
model_family: DSQD
aliases: []
compatible_with:
  manufacturers:
    - Lectrosonics
  models:
    - DSQD
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - lectrosonics.com
source_urls:
  - https://lectrosonics.com/wp-content/uploads/DSQD_Command_Reference_v05Jul2019.pdf
  - https://lectrosonics.com/wp-content/uploads/DSQD_Control_Reference_v31May2019.pdf
  - https://lectrosonics.com/programming-references/
retrieved_at: 2026-07-02T00:08:04.188Z
last_checked_at: 2026-07-07T11:46:01.850Z
generated_at: 2026-07-07T11:46:01.850Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "HTTP request framing (GET/POST/path) not described in source — only that HTTP port exists and accepts the same command syntax. RS-232/serial control not mentioned."
  - "source describes no unsolicited/push notifications. All status"
  - "source documents no multi-step command sequences."
  - "HTTP request framing (method/path) not specified — source only states HTTP port exists and accepts same command syntax."
  - "no RS-232/serial config in source; serial block intentionally omitted."
  - "power/voltage/current specs not in this command reference."
  - "firmware compatibility range not stated; version read at runtime only."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:46:01.850Z
  matched_actions: 68
  action_count: 68
  confidence: medium
  summary: "All 68 spec actions matched verbatim to DSQD source; transport (TCP port 4080, HTTP port 80, CR/CRLF) fully supported; bidirectional coverage complete. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-02
---

# Lectrosonics DSQD Control Spec

## Summary
Lectrosonics DSQD is a 4-channel digital wireless receiver mainframe (D² Digital / Digital Hybrid). Control via ASCII command strings over TCP (default port 4080) and/or HTTP (default port 80). 68 documented command mnemonics covering mainframe, per-channel receiver, channel status, transmitter, and network setup.

<!-- UNRESOLVED: HTTP request framing (GET/POST/path) not described in source — only that HTTP port exists and accepts the same command syntax. RS-232/serial control not mentioned. -->

## Transport
```yaml
protocols:
  - tcp
  - http
addressing:
  port: 4080  # default TCP control port (tcpport); HTTP default port 80 (httpport). Both configurable via commands.
auth:
  type: none  # inferred: no auth procedure in source
```

**Termination:** commands terminated with ASCII CR (0x0D), written `<CR>` in source. Responses terminated with CRLF (0x0D 0x0A), written `<CRLF>`.

**Verbose responses:** commands prefixed with `!` (bang) return a self-describing `OK <property>=<value><CRLF>` form. Non-bang form returns the value only. All examples in source use the bang/verbose form.

**Addressing syntax:** channel-scoped commands use `(addr)` where addr is 1–4 (receiver/transmitter channels), 1–2 (diversity pairs), or 1–3 (comm ports). Wildcard `(*)` returns/sets an integer array of size N; in wildcard updates sentinel `99` (or `999999` for rxfreq) means "leave this channel unchanged".

## Traits
```yaml
traits:
  - powerable       # inferred: rxpwr, dantepwr power on/off commands
  - queryable       # inferred: extensive query commands returning state
  - levelable       # inferred: rxalevel, txgain, fplcdbl level control
  - routable        # inferred: rxtboutch talkback routing, fpmon monitor assignment
```

## Actions
```yaml
# ONE action per documented mnemonic (68 total). Dual query+update mnemonics
# carry the update (set) command; query form noted in description. Read-only
# mnemonics are kind: query. ! = verbose prefix (optional).

# ---- Mainframe commands (21) ----
- id: dantehver
  label: Dante Interface Hardware Version
  kind: query
  command: "!dantehver?<CR>"
  params: []

- id: dantepwr
  label: Dante Interface Power
  kind: action
  command: "!dantepwr={value}<CR>"
  params:
    - name: value
      type: integer
      description: "1=on, 0=off. Query form: !dantepwr?<CR>"

- id: default
  label: Restore Factory Defaults
  kind: action
  command: "default<CR>"
  params: []
  notes: "Use with care - all settings affected."

- id: desc
  label: Mainframe Description String
  kind: action
  command: "!desc=\"{string}\"<CR>"
  params:
    - name: string
      type: string
      description: "Max 30 chars, double-quoted. Escape inner quotes with backslash (\\\"), escape backslash as \\\\. Query form: !desc?<CR>"

- id: fplcdbl
  label: LCD Backlight Brightness
  kind: action
  command: "!fplcdbl={value}<CR>"
  params:
    - name: value
      type: integer
      description: "0-3 (0=min, 3=max). Query form: !fplcdbl?<CR>"

- id: fplcdbltime
  label: LCD Backlight Timeout Period
  kind: action
  command: "!fplcdbltime={value}<CR>"
  params:
    - name: value
      type: integer
      description: "0=always on, 1=30s, 2=5min. Query form: !fplcdbltime?<CR>"

- id: fplock
  label: Front Panel Lock
  kind: action
  command: "!fplock={value}<CR>"
  params:
    - name: value
      type: integer
      description: "1=locked, 0=unlocked. Query form: !fplock?<CR>"

- id: fpmon
  label: Headphone Monitor Assignment
  kind: action
  command: "!fpmon={value}<CR>"
  params:
    - name: value
      type: integer
      description: "1-4 (output channel, mono mix). Query form: !fpmon?<CR>"

- id: hwstat
  label: Hardware Status
  kind: query
  command: "!hwstat?<CR>"
  params: []
  notes: "0=normal, 1=antenna phantom power short detected."

- id: hversion
  label: Mainframe Hardware Version
  kind: query
  command: "!hversion?<CR>"
  params: []

- id: id
  label: Mainframe ID String
  kind: query
  command: "!id?<CR>"
  params: []
  notes: "Device name, always \"DSQD\"."

- id: instance
  label: Encryption Key Instance Count
  kind: query
  command: "!instance?<CR>"
  params: []
  notes: "Integer 0-255."

- id: kpolicy
  label: Encryption Key Policy
  kind: action
  command: "!kpolicy={value}<CR>"
  params:
    - name: value
      type: integer
      description: "1=standard, 2=shared key, 3=universal key. Query form: !kpolicy?<CR>"

- id: locale
  label: Frequency Coordination Locale
  kind: action
  command: "!locale={value}<CR>"
  params:
    - name: value
      type: integer
      description: "0=NA (North America), 1=EU (European Union). Query form: !locale?<CR>"

- id: phantpwr
  label: Antenna Phantom Power
  kind: action
  command: "!phantpwr={value}<CR>"
  params:
    - name: value
      type: integer
      description: "0=none, 1=antenna A, 2=antenna B, 3=both A+B. Query form: !phantpwr?<CR>"

- id: portctl
  label: Communication Port Control Flags
  kind: action
  command: "!portctl({addr})={value}<CR>"
  params:
    - name: addr
      type: integer
      description: "1=TCP port 1, 2=TCP port 2, 3=HTTP port. Wildcard * = array[3]."
    - name: value
      type: integer
      description: "0=disabled, 1=receive only, 2=send only, 3=send/receive. Query form: !portctl({addr})?<CR>"

- id: region
  label: Mainframe ITU Region
  kind: query
  command: "!region?<CR>"
  params: []
  notes: "Read-only, hardware-dependent. 1, 2, or 3."

- id: rfhver
  label: RF Board Hardware Version
  kind: query
  command: "!rfhver?<CR>"
  params: []

- id: rfver
  label: RF Board Firmware Version
  kind: query
  command: "!rfver?<CR>"
  params: []

- id: serial
  label: Mainframe Serial Number
  kind: query
  command: "!serial?<CR>"
  params: []

- id: version
  label: Mainframe Firmware Version
  kind: query
  command: "!version?<CR>"
  params: []

# ---- Channel Receiver commands (20) ----
- id: rxalevel
  label: Receiver Audio Attenuator Level
  kind: action
  command: "!rxalevel({addr})={level}<CR>"
  params:
    - name: addr
      type: integer
      description: "1-4. Wildcard * = array[4]; 99 in update = unchanged."
    - name: level
      type: integer
      description: "Attenuation/gain in dB, -35 to +8. Query form: !rxalevel({addr})?<CR>"

- id: rxameter
  label: Receiver Audio Level Meter
  kind: query
  command: "!rxameter({addr})?<CR>"
  params:
    - name: addr
      type: integer
      description: "1-4. Wildcard * = array[4]."
  notes: "-120 to 0 in 1/2 dB steps = -60 to 0 dBFS."

- id: rxclip
  label: Audio Clipping Status
  kind: query
  command: "!rxclip({addr})?<CR>"
  params:
    - name: addr
      type: integer
      description: "1-4. Wildcard * = array[4]."
  notes: "1=clipping, 0=not."

- id: rxdivmode
  label: Receiver Diversity Reception Mode
  kind: action
  command: "!rxdivmode({addr})={value}<CR>"
  params:
    - name: addr
      type: integer
      description: "1-2 (channel PAIRS: pair1=ch1+2, pair2=ch3+4). Wildcard * = array[2]; 99=unchanged."
    - name: value
      type: integer
      description: "0=switched (default), 1=ratio diversity, 2=frequency diversity. Query form: !rxdivmode({addr})?<CR>"

- id: rxfreq
  label: Receiver Frequency
  kind: action
  command: "!rxfreq({addr})={freq}<CR>"
  params:
    - name: addr
      type: integer
      description: "1-4. Wildcard * = array[4]; 999999 in update = unchanged."
    - name: freq
      type: integer
      description: "Frequency in kHz (e.g. 471200). Query form: !rxfreq({addr})?<CR>"

- id: rxgrptun
  label: Receiver Tuning Group Assignment
  kind: action
  command: "!rxgrptun({addr})={value}<CR>"
  params:
    - name: addr
      type: integer
      description: "1-4. Wildcard * = array[4]; 99=unchanged."
    - name: value
      type: integer
      description: "0=none (default), 1=group U, 2=V, 3=W, 4=X. Query form: !rxgrptun({addr})?<CR>"

- id: rxlink
  label: Receiver Link Status
  kind: query
  command: "!rxlink({addr})?<CR>"
  params:
    - name: addr
      type: integer
      description: "1-4. Wildcard * = array[4]."
  notes: "1=valid signal acquired, 0=not."

- id: rxmode
  label: Receiver Compatibility Mode
  kind: action
  command: "!rxmode({addr})={value}<CR>"
  params:
    - name: addr
      type: integer
      description: "1-4. Wildcard * = array[4]; 99=unchanged."
    - name: value
      type: integer
      description: "0=D² Digital, 1=Duet IEM ch1, 2=Duet IEM ch2, 3=Legacy Digital Hybrid, 4=EU Digital Hybrid, 5=Nu Hybrid, 6=JA (Japan). Query form: !rxmode({addr})?<CR>"

- id: rxmute
  label: Receiver Mute Status
  kind: action
  command: "!rxmute({addr})={value}<CR>"
  params:
    - name: addr
      type: integer
      description: "1-4. Wildcard * = array[4]; 99=unchanged."
    - name: value
      type: integer
      description: "1=muted, 0=unmuted. Query form: !rxmute({addr})?<CR>"

- id: rxmutetog
  label: Receiver Mute Toggle
  kind: action
  command: "!rxmutetog({addr})<CR>"
  params:
    - name: addr
      type: integer
      description: "1-4."
  notes: "Toggles mute. Verbose response returns new mute status."

- id: rxname
  label: Receiver Name
  kind: action
  command: "!rxname({addr})=\"{string}\"<CR>"
  params:
    - name: addr
      type: integer
      description: "1-4. Wildcard * = array[4]."
    - name: string
      type: string
      description: "Max 15 chars, double-quoted, backslash-escaped. Query form: !rxname({addr})?<CR>"

- id: rxphase
  label: Receiver Audio Phase
  kind: action
  command: "!rxphase({addr})={value}<CR>"
  params:
    - name: addr
      type: integer
      description: "1-4. Wildcard * = array[4]; 99=unchanged."
    - name: value
      type: integer
      description: "1=inverted (180°), 0=normal. Query form: !rxphase({addr})?<CR>"

- id: rxplllock
  label: Receiver PLL Lock Status
  kind: query
  command: "!rxplllock({addr})?<CR>"
  params:
    - name: addr
      type: integer
      description: "1-4. Wildcard * = array[4]."
  notes: "1=PLL locked, 0=not."

- id: rxpwr
  label: Receiver Power
  kind: action
  command: "!rxpwr({addr})={value}<CR>"
  params:
    - name: addr
      type: integer
      description: "1-4. Wildcard * = array[4]; 99=unchanged."
    - name: value
      type: integer
      description: "1=powered on, 0=powered off. Query form: !rxpwr({addr})?<CR>"

- id: rxrmeter
  label: Receiver RF Level Meter
  kind: query
  command: "!rxrmeter({addr})?<CR>"
  params:
    - name: addr
      type: integer
      description: "1-4. Wildcard * = array[4]."
  notes: "0-240 in 1/4 dBuV steps = 0-60 dBuV."

- id: rxsmartnr
  label: Receiver Smart Noise Reduction
  kind: action
  command: "!rxsmartnr({addr})={value}<CR>"
  params:
    - name: addr
      type: integer
      description: "1-4. Wildcard * = array[4]; 99=unchanged."
    - name: value
      type: integer
      description: "0=off, 1=normal, 2=high. Applies ONLY to Digital Hybrid modes. Query form: !rxsmartnr({addr})?<CR>"

- id: rxsquelch
  label: Receiver Squelch Status
  kind: query
  command: "!rxsquelch({addr})?<CR>"
  params:
    - name: addr
      type: integer
      description: "1-4. Wildcard * = array[4]."
  notes: "1=squelched (no audio), 0=not."

- id: rxtben
  label: Receiver Talkback Enable
  kind: action
  command: "!rxtben({addr})={value}<CR>"
  params:
    - name: addr
      type: integer
      description: "1-4. Wildcard * = array[4]; 99=unchanged."
    - name: value
      type: integer
      description: "1=talkback enabled, 0=disabled."

- id: rxtboutch
  label: Receiver Talkback Output Channel
  kind: action
  command: "!rxtboutch({addr})={value}<CR>"
  params:
    - name: addr
      type: integer
      description: "1-4. Wildcard * = array[4]; 99=unchanged."
    - name: value
      type: integer
      description: "Channel talkback audio routes to (1-4). Meaningful only if talkback enabled. Query form: !rxtboutch({addr})?<CR>"

- id: rxtone
  label: Receiver Output Test Tone
  kind: action
  command: "!rxtone({addr})={value}<CR>"
  params:
    - name: addr
      type: integer
      description: "1-4. Wildcard * = array[4]; 99=unchanged."
    - name: value
      type: integer
      description: "1=test tone enabled, 0=disabled."

# ---- Channel Status (1) ----
- id: chstat
  label: Channel Status
  kind: query
  command: "!chstat({addr})?<CR>"
  params:
    - name: addr
      type: integer
      description: "1-4."
  notes: "Returns integer array[16]: [1]=rx present, [2]=rx power, [3]=link, [4]=audio meter, [5]=RF meter, [6]=scan status, [7]=antenna diversity (1=A/2=B), [8]=mute, [9]=squelch, [10]=tx battery timer(min), [11]=tx batt warning, [12]=tx panel lock, [13]=tx limiter, [14]=tx clipping, [15]=tx batt voltage (0-100, 1/10V), [16]=tx batt percent. Tx data valid only when link=1."

# ---- Channel Transmitter commands (19) ----
- id: txautoon
  label: Transmitter Auto-On
  kind: query
  command: "!txautoon({addr})?<CR>"
  params:
    - name: addr
      type: integer
      description: "1-4. Wildcard * = array[4]."
  notes: "1=auto-on enabled, 0=not."

- id: txbalert
  label: Transmitter Battery Timer Alert Threshold
  kind: query
  command: "!txbalert({addr})?<CR>"
  params:
    - name: addr
      type: integer
      description: "1-4. Wildcard * = array[4]."
  notes: "Elapsed minutes 0-599; 599=Off."

- id: txbatt
  label: Transmitter Battery Type
  kind: query
  command: "!txbatt({addr})?<CR>"
  params:
    - name: addr
      type: integer
      description: "1-4. Wildcard * = array[4]."
  notes: "0=1.5V Alkaline, 1=1.5V Lithium, 2=9V Alkaline, 3=9V Lithium, 4=LB-50 rechargeable."

- id: txbl
  label: Transmitter Backlight Timeout
  kind: query
  command: "!txbl({addr})?<CR>"
  params:
    - name: addr
      type: integer
      description: "1-4. Wildcard * = array[4]."
  notes: "0=no timeout, 1=30s, 2=5min."

- id: txblevel
  label: Transmitter Battery Voltage Level
  kind: query
  command: "!txblevel({addr})?<CR>"
  params:
    - name: addr
      type: integer
      description: "1-4. Wildcard * = array[4]."
  notes: "0-31, battery voltage in 1/10 V increments."

- id: txblock
  label: Transmitter Frequency Block
  kind: query
  command: "!txblock({addr})?<CR>"
  params:
    - name: addr
      type: integer
      description: "1-4."
  notes: "String (e.g. \"A1\")."

- id: txbpercent
  label: Transmitter Battery Percent
  kind: query
  command: "!txbpercent({addr})?<CR>"
  params:
    - name: addr
      type: integer
      description: "1-4. Wildcard * = array[4]."
  notes: "0-100 percent of full capacity."

- id: txbtime
  label: Transmitter Battery Time
  kind: query
  command: "!txbtime({addr})?<CR>"
  params:
    - name: addr
      type: integer
      description: "1-4. Wildcard * = array[4]."
  notes: "Elapsed minutes 0-599."

- id: txbutton
  label: Transmitter Button Function
  kind: query
  command: "!txbutton({addr})?<CR>"
  params:
    - name: addr
      type: integer
      description: "1-4. Wildcard * = array[4]."
  notes: "0=no function, 1=mute on/off, 2=power on/off."

- id: txbwarn
  label: Transmitter Battery Warning
  kind: query
  command: "!txbwarn({addr})?<CR>"
  params:
    - name: addr
      type: integer
      description: "1-4. Wildcard * = array[4]."
  notes: "0=off, 1=<25%, 2=<10%, 3=reserved, 4=time-expired alarm."

- id: txgain
  label: Transmitter Audio Gain
  kind: query
  command: "!txgain({addr})?<CR>"
  params:
    - name: addr
      type: integer
      description: "1-4. Wildcard * = array[4]."
  notes: "Gain in dB (approx), scale varies by transmitter model."

- id: txkeygood
  label: Transmitter Encryption Key Status
  kind: query
  command: "!txkeygood({addr})?<CR>"
  params:
    - name: addr
      type: integer
      description: "1-4. Wildcard * = array[4]."
  notes: "1=key valid, 0=not."

- id: txlock
  label: Transmitter Panel Lock Status
  kind: query
  command: "!txlock({addr})?<CR>"
  params:
    - name: addr
      type: integer
      description: "1-4. Wildcard * = array[4]."
  notes: "1=panel locked, 0=not."

- id: txname
  label: Transmitter Name
  kind: action
  command: "!txname({addr})=\"{string}\"<CR>"
  params:
    - name: addr
      type: integer
      description: "1-4. Wildcard * = array[4]."
    - name: string
      type: string
      description: "Max 15 chars, double-quoted, backslash-escaped. Query form: !txname({addr})?<CR>"

- id: txphase
  label: Transmitter Audio Phase
  kind: query
  command: "!txphase({addr})?<CR>"
  params:
    - name: addr
      type: integer
      description: "1-4. Wildcard * = array[4]."
  notes: "1=inverted (180°), 0=not."

- id: txrfon
  label: Transmitter RF On/Off Status
  kind: query
  command: "!txrfon({addr})?<CR>"
  params:
    - name: addr
      type: integer
      description: "1-4. Wildcard * = array[4]."
  notes: "1=RF carrier enabled, 0=not. (Source example typo: txrfoon.)"

- id: txrolloff
  label: Transmitter Low Frequency Rolloff
  kind: query
  command: "!txrolloff({addr})?<CR>"
  params:
    - name: addr
      type: integer
      description: "1-4. Wildcard * = array[4]."
  notes: "0=35Hz, 1=50Hz, 2=70Hz, 3=100Hz, 4=120Hz, 5=150Hz."

- id: txstepsize
  label: Transmitter Tuning Step Size
  kind: query
  command: "!txstepsize({addr})?<CR>"
  params:
    - name: addr
      type: integer
      description: "1-4. Wildcard * = array[4]."
  notes: "25 or 100 kHz."

- id: txuserxname
  label: Use Receiver Name As Transmitter Name
  kind: query
  command: "!txuserxname({addr})?<CR>"
  params:
    - name: addr
      type: integer
      description: "1-4. Wildcard * = array[4]."
  notes: "1=tx name synced to rx name, 0=not. (Source command-table lists this as 'txusrxname'; section + examples use 'txuserxname'.)"

# ---- Network Setup commands (7) ----
- id: defgate
  label: Default Gateway
  kind: action
  command: "!defgate=\"{addr_ip}\"<CR>"
  params:
    - name: addr_ip
      type: string
      description: "IP dotted-quad string. Query form: !defgate?<CR>"

- id: dhcpen
  label: DHCP Enable
  kind: action
  command: "!dhcpen={value}<CR>"
  params:
    - name: value
      type: integer
      description: "1=enabled, 0=disabled. Takes effect next power-up. Query form: !dhcpen?<CR>"

- id: httpport
  label: HTTP Port Number
  kind: action
  command: "!httpport={value}<CR>"
  params:
    - name: value
      type: integer
      description: "0-65535. Default 80. Query form: !httpport?<CR>"

- id: ipaddr
  label: IP Address
  kind: action
  command: "!ipaddr=\"{addr_ip}\"<CR>"
  params:
    - name: addr_ip
      type: string
      description: "IP dotted-quad string. Query form: !ipaddr?<CR>"

- id: macaddr
  label: MAC Address
  kind: query
  command: "!macaddr?<CR>"
  params: []
  notes: "IEEE MAC-48 string (e.g. \"00-24-34-32-00-22\")."

- id: netmask
  label: Network Mask
  kind: action
  command: "!netmask=\"{mask}\"<CR>"
  params:
    - name: mask
      type: string
      description: "IP dotted-quad string. Query form: !netmask?<CR>"

- id: tcpport
  label: TCP Port Number
  kind: action
  command: "!tcpport={value}<CR>"
  params:
    - name: value
      type: integer
      description: "0-65535. Default 4080. Query form: !tcpport?<CR>"
```

## Feedbacks
```yaml
# Representative observable states. All query actions above return a feedback
# value; entries below capture the high-value device/channel states.
- id: dante_power_state
  type: enum
  values: [on, off]
  source: "!dantepwr?"

- id: hardware_status
  type: enum
  values: [normal, antenna_phantom_short]
  source: "!hwstat?"

- id: rx_power_state
  type: enum
  values: [on, off]
  source: "!rxpwr({addr})?"

- id: rx_link_state
  type: enum
  values: [linked, no_link]
  source: "!rxlink({addr})?"

- id: rx_mute_state
  type: enum
  values: [muted, unmuted]
  source: "!rxmute({addr})?"

- id: rx_squelch_state
  type: enum
  values: [squelched, open]
  source: "!rxsquelch({addr})?"

- id: rx_clip_state
  type: enum
  values: [clipping, clear]
  source: "!rxclip({addr})?"

- id: rx_pll_lock_state
  type: enum
  values: [locked, unlocked]
  source: "!rxplllock({addr})?"

- id: rx_audio_level
  type: number
  unit: dBFS
  range: [-60, 0]
  source: "!rxameter({addr})?"

- id: rx_rf_level
  type: number
  unit: dBuV
  range: [0, 60]
  source: "!rxrmeter({addr})?"

- id: rx_frequency
  type: number
  unit: kHz
  source: "!rxfreq({addr})?"

- id: tx_battery_percent
  type: number
  unit: percent
  range: [0, 100]
  source: "!txbpercent({addr})?"

- id: tx_battery_warning
  type: enum
  values: [off, under_25, under_10, reserved, time_expired]
  source: "!txbwarn({addr})?"

- id: tx_rf_state
  type: enum
  values: [on, off]
  source: "!txrfon({addr})?"

- id: tx_panel_lock_state
  type: enum
  values: [locked, unlocked]
  source: "!txlock({addr})?"

- id: tx_key_valid
  type: enum
  values: [valid, invalid]
  source: "!txkeygood({addr})?"

- id: channel_status_array
  type: array
  length: 16
  source: "!chstat({addr})?"
  description: "Real-time combined rx+tx status (see chstat action notes for position map)."

- id: ip_address
  type: string
  source: "!ipaddr?"

- id: tcp_port
  type: number
  range: [0, 65535]
  source: "!tcpport?"

- id: http_port
  type: number
  range: [0, 65535]
  source: "!httpport?"
# Remaining query mnemonics (version strings, names, locale, etc.) are
# reflected via their query Actions above.
```

## Variables
```yaml
# Settable parameters are represented as update Actions (rxalevel, rxfreq,
# rxname, txname, desc, fplcdbl, fplcdbltime, network settings, etc.).
# No additional standalone variables beyond those actions.
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited/push notifications. All status
# is obtained by polling query commands (notably chstat). No event mechanism documented.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for:
  - default  # restores ALL factory settings - destructive
interlocks: []
notes: >
  No explicit safety interlock sequences in source. 'default' command is the
  only destructive operation (full factory reset). dhcpen / ipaddr / netmask /
  defgate / tcpport / httpport changes affect network reachability; dhcpen
  change takes effect only at next power-up.
```

## Notes
- 68 documented command mnemonics across 5 groups: mainframe (21), receiver (20), status (1), transmitter (19), network (7).
- 4 receiver channels; commands use `(addr)` 1–4. Diversity mode addresses channel *pairs* 1–2. Comm-port control addresses ports 1–3.
- Wildcard `(*)` returns integer arrays; update sentinels: `99` = leave-unchanged (channels), `999999` = leave-unchanged (rxfreq).
- String args (desc, rxname, txname, ipaddr, netmask, defgate) are double-quoted; backslash-escape inner quotes and backslashes; `\xHH`, `\r`, `\n`, `\t` escapes recognized.
- Source typos preserved/noted: command-table lists `txusrxname`, section + examples use `txuserxname`; `txrfon` example written `txrfoon`.
- Smart Noise Reduction (rxsmartnr) applies ONLY to Digital Hybrid compatibility modes.

<!-- UNRESOLVED: HTTP request framing (method/path) not specified — source only states HTTP port exists and accepts same command syntax. -->
<!-- UNRESOLVED: no RS-232/serial config in source; serial block intentionally omitted. -->
<!-- UNRESOLVED: power/voltage/current specs not in this command reference. -->
<!-- UNRESOLVED: firmware compatibility range not stated; version read at runtime only. -->

## Provenance

```yaml
source_domains:
  - lectrosonics.com
source_urls:
  - https://lectrosonics.com/wp-content/uploads/DSQD_Command_Reference_v05Jul2019.pdf
  - https://lectrosonics.com/wp-content/uploads/DSQD_Control_Reference_v31May2019.pdf
  - https://lectrosonics.com/programming-references/
retrieved_at: 2026-07-02T00:08:04.188Z
last_checked_at: 2026-07-07T11:46:01.850Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:46:01.850Z
matched_actions: 68
action_count: 68
confidence: medium
summary: "All 68 spec actions matched verbatim to DSQD source; transport (TCP port 4080, HTTP port 80, CR/CRLF) fully supported; bidirectional coverage complete. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "HTTP request framing (GET/POST/path) not described in source — only that HTTP port exists and accepts the same command syntax. RS-232/serial control not mentioned."
- "source describes no unsolicited/push notifications. All status"
- "source documents no multi-step command sequences."
- "HTTP request framing (method/path) not specified — source only states HTTP port exists and accepts same command syntax."
- "no RS-232/serial config in source; serial block intentionally omitted."
- "power/voltage/current specs not in this command reference."
- "firmware compatibility range not stated; version read at runtime only."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
